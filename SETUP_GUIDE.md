# 🛍️ Guía de Configuración - Catálogo de Productos

## Visión General

Este proyecto integra una API externa de productos usando una arquitectura segura de Next.js con:
- **Backend API Route** (`/app/api/store/route.ts`) - Proxy seguro que maneja autenticación
- **Server Component** (`/app/shop/page.tsx`) - Renderiza productos sin exponer credenciales
- **Helper Function** (`/lib/getProducts.ts`) - Obtiene datos de forma reutilizable

## Arquitectura

```
Frontend (Browser)
    ↓
/app/shop/page.tsx (Server Component)
    ↓
/lib/getProducts.ts (Server Function)
    ↓
/app/api/store/route.ts (API Route - Backend)
    ↓ (con token JLOS_TOKEN)
https://roumenu.vercel.app/api/data/jloscosmetics (API Externa)
```

**Seguridad**: El token `JLOS_TOKEN` nunca viaja al navegador. Se usa solo en el backend.

## Configuración Paso a Paso

### 1. Configurar Variable de Entorno en Vercel

#### En Development Local:
```bash
# Crea un archivo .env.local en la raíz del proyecto
echo "JLOS_TOKEN=tu_token_aqui" > .env.local
```

#### En Vercel (Producción):
1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Haz clic en **Add New**
4. Rellena:
   - **Name**: `JLOS_TOKEN`
   - **Value**: Tu token de autenticación
   - **Environments**: Selecciona todos (Production, Preview, Development)
5. Haz clic en **Save**
6. **Redeploy** tu proyecto para aplicar los cambios

### 2. Verificar Configuración

Para verificar que todo funciona:

1. **En local**: `npm run dev` (si está configurado en `.env.local`)
2. **Accede**: http://localhost:3000/shop
3. Deberías ver productos cargándose

### 3. Probar API Directamente

Puedes testear el endpoint en tu navegador o con curl:

```bash
# Local
curl http://localhost:3000/api/store

# En producción (después de deployed)
curl https://tu-dominio.vercel.app/api/store
```

Respuesta esperada:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Producto Name",
      "price": 29.99,
      "description": "Descripción",
      "image": "url-a-imagen"
    }
    // ... más productos
  ],
  "count": 8,
  "timestamp": "2024-02-13T10:30:00.000Z"
}
```

## Estructura de Archivos

```
app/
├── api/
│   └── store/
│       └── route.ts           # API proxy (backend)
├── shop/
│   └── page.tsx               # Página de catálogo (server component)
├── api-demo/
│   └── page.tsx               # Página de demostración
└── layout.tsx

lib/
└── getProducts.ts             # Función helper

components/
├── product-card.tsx           # Tarjeta de producto
└── store-data.tsx             # Componente de datos (legacy)

SETUP_GUIDE.md                 # Este archivo
```

## Funcionalidades Implementadas

✅ **Seguridad**:
- Token almacenado en variables de entorno (nunca en frontend)
- Proxy interno que maneja autenticación
- Errores sin exponer detalles sensibles

✅ **Performance**:
- Server Components (sin JavaScript innecesario)
- Caching inteligente (3600 segundos en API)
- Suspense para manejo de carga

✅ **UX**:
- Grilla responsive (1-4 columnas según pantalla)
- Loading skeleton durante la carga
- Mensajes de error claros
- Tarjetas de producto con hover effect

✅ **Mantenibilidad**:
- Código tipado con TypeScript
- Comentarios JSDoc en funciones clave
- Logging en consola para debugging
- Estructura escalable para agregar filtros

## Próximas Características (Roadmap)

Estas están diseñadas en la arquitectura pero no activadas aún:

- [ ] Filtros por categoría
- [ ] Filtros por paso (Prep, Treat, Seal)
- [ ] Ordenamiento por precio/nombre
- [ ] Búsqueda de productos
- [ ] Paginación o infinite scroll
- [ ] Detalles del producto (página individual)
- [ ] Carrito de compras
- [ ] Integraciones de pago

## Troubleshooting

### Error: "Authentication token not configured"

**Causa**: `JLOS_TOKEN` no está en variables de entorno.

**Solución**:
1. En local: Crea `.env.local` con `JLOS_TOKEN=tu_token`
2. En Vercel: Ve a Settings → Environment Variables y agrega `JLOS_TOKEN`
3. Redeploy después de agregar variables

### Error: "401 Unauthorized"

**Causa**: Token inválido o expirado.

**Solución**:
1. Verifica que el token sea correcto
2. Contacta al proveedor de la API para generar un nuevo token
3. Actualiza la variable en Vercel

### Error: "External API timeout"

**Causa**: La API externa está lenta o no responde.

**Solución**:
1. Espera unos minutos y recarga
2. Verifica tu conexión a internet
3. Contacta al soporte de la API externa

### No se cargan productos

**Debug**:
1. Abre DevTools (F12) → Network
2. Busca una request a `/api/store`
3. Revisa el Response JSON
4. Verifica en la consola (servidor) si hay logs de `[v0]`

## Variables de Entorno

| Variable | Requerida | Valor | Notas |
|----------|-----------|-------|-------|
| `JLOS_TOKEN` | ✅ Sí | Tu token | Credentials para API externa |
| `NEXT_PUBLIC_API_URL` | ❌ No | URL de API | Opcional, por defecto es VERCEL_URL |

## Documentación Relacionada

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [React Suspense](https://react.dev/reference/react/Suspense)

## Soporte

Si encuentras problemas:
1. Revisa los logs en la consola del servidor
2. Verifica que `JLOS_TOKEN` esté configurado
3. Prueba el endpoint `/api/store` directamente
4. Contacta al equipo de desarrollo
