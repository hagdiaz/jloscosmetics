import { StoreDataComponent } from '@/components/store-data'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'API Demo - JLos Cosmetics',
  description: 'Demostración de integración con API externa',
}

export default function ApiDemoPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Demo de API Externa
          </h1>
          <p className="text-lg text-muted-foreground">
            Integración con roumenu.vercel.app usando proxy seguro
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-8 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Arquitectura Implementada</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">{'✓'}</span>
              <span>{'Lógica compartida en '}<code className="rounded bg-muted px-1 py-0.5">/lib/store.ts</code>{' (sin fetch interno)'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">{'✓'}</span>
              <span>{'Token de autenticación protegido en variables de entorno (JLOS_TOKEN)'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">{'✓'}</span>
              <span>{'Server Components llaman directamente a getStoreProducts() — sin localhost'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">{'✓'}</span>
              <span>{'Route Handler /api/store disponible para clientes externos'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">{'✓'}</span>
              <span>{'Cache con revalidación cada hora (next: { revalidate: 3600 })'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">{'✓'}</span>
              <span>{'Sin dependencias de localhost ni DYNAMIC_SERVER_USAGE'}</span>
            </li>
          </ul>
        </div>

        {/* Data Display */}
        <div className="rounded-lg border bg-card p-6">
          <StoreDataComponent />
        </div>

        {/* Footer Instructions */}
        <div className="mt-8 rounded-lg border bg-muted p-6">
          <h3 className="mb-3 font-semibold">Configuración en Vercel</h3>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Ve a tu proyecto en vercel.com</li>
            <li>Navega a Settings → Environment Variables</li>
            <li>Agrega la variable:
              <ul className="ml-6 mt-1 list-inside list-disc">
                <li><strong>Key:</strong> JLOS_TOKEN</li>
                <li><strong>Value:</strong> Tu token de API</li>
                <li><strong>Environments:</strong> Production, Preview, Development</li>
              </ul>
            </li>
            <li>Guarda y redeploy tu aplicación</li>
          </ol>
        </div>
      </div>
    </main>
  )
}
