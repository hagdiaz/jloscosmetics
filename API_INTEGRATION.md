# Integración de API Externa - JLos Cosmetics

## Arquitectura

Esta implementación sigue las mejores prácticas de Next.js App Router para integrar APIs externas de forma segura.

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Browser   │  ────▶  │  /api/store      │  ────▶  │  External API   │
│  (Client)   │         │  (Route Handler) │         │  roumenu.app    │
└─────────────┘         └──────────────────┘         └─────────────────┘
                               │
                               │ usa
                               ▼
                        ┌──────────────┐
                        │  JLOS_TOKEN  │
                        │  (env var)   │
                        └──────────────┘
```

## Archivos Implementados

### 1. `/app/api/store/route.ts`
Route handler interno que actúa como proxy seguro:
- Valida que `JLOS_TOKEN` existe
- Hace GET request a `https://roumenu.vercel.app/api/data/jloscosmetics`
- Envía header `x-editor-key` con el token
- Maneja todos los códigos de error HTTP
- Implementa timeout de 10 segundos
- Cache con revalidación de 1 hora
- Logging seguro (nunca expone el token)

**Códigos de error manejados:**
- `401` - Token inválido
- `403` - Acceso denegado
- `404` - Endpoint no encontrado
- `429` - Rate limit excedido
- `500/502/503/504` - Error del servidor externo
- `Timeout` - Request excedió 10 segundos
- `Network Error` - No se pudo conectar

### 2. `/components/store-data.tsx`
Server Component que consume la API interna:
- Llama a `/api/store` (nunca a la API externa directamente)
- Usa `cache: 'no-store'` para datos frescos
- Renderiza productos en un grid responsive
- Muestra alertas visuales para errores específicos
- Fallback elegante para respuestas vacías
- Timestamp de última actualización

### 3. `/app/api-demo/page.tsx`
Página de demostración:
- Muestra la integración en acción
- Documenta la arquitectura implementada
- Instrucciones de configuración

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Token de autenticación (REQUERIDO)
JLOS_TOKEN=tu-token-real-aqui

# URL de la app (OPCIONAL, solo para desarrollo)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### En Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Navega a **Settings → Environment Variables**
3. Agrega la variable:
   - **Name:** `JLOS_TOKEN`
   - **Value:** Tu token de API
   - **Environments:** Marca Production, Preview y Development
4. Guarda y haz redeploy

## Uso

### En Server Components

```tsx
import { StoreDataComponent } from '@/components/store-data'

export default function MyPage() {
  return (
    <div>
      <h1>Mis Productos</h1>
      <StoreDataComponent />
    </div>
  )
}
```

### Fetch Manual en Server Components

```tsx
export default async function CustomPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  const response = await fetch(`${baseUrl}/api/store`, {
    cache: 'no-store', // o cache: 'force-cache' según necesites
  })
  
  const data = await response.json()
  
  return (
    <div>
      {data.success && (
        <ul>
          {data.data.map((product: any) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### En Client Components (con SWR o React Query)

```tsx
'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function ProductList() {
  const { data, error, isLoading } = useSWR('/api/store', fetcher)
  
  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar</div>
  
  return (
    <div>
      {data.data.map((product: any) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## Seguridad

### ✅ Implementado

- Token **nunca** se expone en el cliente
- Token **nunca** aparece en logs de producción
- Token se lee desde variables de entorno
- Validación de token antes de cada request
- Headers de autenticación protegidos
- Route handler en backend (no accesible desde navegador)
- CORS manejado automáticamente por Next.js

### ❌ Evitado

- No se usa `fetch` directo desde Client Components
- No se expone la URL de la API externa en el frontend
- No se hardcodea el token en el código
- No se loguea el token completo (solo su existencia)

## Cache y Performance

### Estrategia de Cache

```typescript
// En route handler
export const revalidate = 3600 // Revalidar cada hora

// En headers de respuesta
'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
```

**Comportamiento:**
1. Primera request: Fetch a API externa
2. Siguientes requests (< 1 hora): Sirve desde cache
3. Después de 1 hora: Revalida en background
4. Si API externa falla: Sirve versión stale por 2 horas más

### Timeout

- Request timeout: **10 segundos**
- Si excede: Devuelve error `504 Gateway Timeout`

## Troubleshooting

### Error: "Authentication token not configured"

**Causa:** `JLOS_TOKEN` no está en variables de entorno

**Solución:**
1. Verifica que `.env.local` existe y tiene `JLOS_TOKEN=...`
2. Reinicia el servidor de desarrollo (`pnpm dev`)
3. En producción, verifica las variables en Vercel

### Error: "Unauthorized" (401)

**Causa:** Token inválido o expirado

**Solución:**
1. Verifica que el token es correcto
2. Contacta al proveedor de la API para renovar el token
3. Actualiza `JLOS_TOKEN` en Vercel

### Error: "Rate Limited" (429)

**Causa:** Demasiadas requests a la API externa

**Solución:**
1. La app ya tiene cache de 1 hora
2. Considera aumentar el tiempo de cache si es apropiado
3. Implementa rate limiting en tu app

### Error: "Network Error" o Timeout

**Causa:** API externa no responde o está caída

**Solución:**
1. Verifica que `https://roumenu.vercel.app` está accesible
2. Revisa los logs de Vercel para más detalles
3. Contacta al proveedor de la API

## Testing

### Desarrollo Local

```bash
# 1. Configura el token
echo "JLOS_TOKEN=tu-token" > .env.local

# 2. Inicia el servidor
pnpm dev

# 3. Visita la demo
open http://localhost:3000/api-demo
```

### Testing del Endpoint

```bash
# Desde tu app Next.js
curl http://localhost:3000/api/store

# Respuesta esperada:
# {
#   "success": true,
#   "data": [...],
#   "count": 10,
#   "timestamp": "2024-01-15T10:30:00.000Z"
# }
```

## Logs y Monitoreo

Los logs usan el prefijo `[v0]` para facilitar filtrado:

```
[v0] Fetching data from external API: https://roumenu.vercel.app/...
[v0] External API response status: 200 (234ms)
[v0] Successfully fetched 10 products
```

En Vercel, puedes filtrar logs con: `[v0]`

## Próximos Pasos

### Mejoras Opcionales

1. **Paginación:** Si la API externa soporta paginación
2. **Búsqueda:** Filtros y búsqueda de productos
3. **Webhooks:** Invalidar cache cuando cambian los datos
4. **Error Boundary:** Componente de error personalizado
5. **Loading States:** Skeleton loaders mientras carga
6. **Optimistic UI:** Actualizar UI antes de confirmar

## Soporte

Si tienes problemas:
1. Revisa los logs en Vercel (Runtime Logs)
2. Verifica que las variables de entorno están configuradas
3. Prueba el endpoint directamente: `/api/store`
4. Revisa el status de la API externa

---

**Implementación completa y lista para producción** ✓
