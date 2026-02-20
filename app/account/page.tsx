import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Package, User, MapPin, CreditCard } from "lucide-react"

export default function AccountPage() {
  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-medium tracking-tight">Mi Cuenta</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/account/orders">
            <Card className="group p-8 transition-colors hover:bg-accent">
              <Package className="mb-4 h-8 w-8 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-medium">Pedidos</h2>
              <p className="text-sm text-muted-foreground">Ver historial de pedidos y rastrear envíos</p>
            </Card>
          </Link>

          <Link href="/account/profile">
            <Card className="group p-8 transition-colors hover:bg-accent">
              <User className="mb-4 h-8 w-8 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-medium">Perfil</h2>
              <p className="text-sm text-muted-foreground">Gestiona tu información personal</p>
            </Card>
          </Link>

          <Link href="/account/addresses">
            <Card className="group p-8 transition-colors hover:bg-accent">
              <MapPin className="mb-4 h-8 w-8 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-medium">Direcciones</h2>
              <p className="text-sm text-muted-foreground">Actualiza direcciones de envío y facturación</p>
            </Card>
          </Link>

          <Link href="/account/payment">
            <Card className="group p-8 transition-colors hover:bg-accent">
              <CreditCard className="mb-4 h-8 w-8 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-medium">Métodos de Pago</h2>
              <p className="text-sm text-muted-foreground">Gestiona opciones de pago guardadas</p>
            </Card>
          </Link>
        </div>

        <Card className="mt-8 p-8">
          <h2 className="mb-4 text-xl font-medium">Detalles de la Cuenta</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Correo Electrónico</span>
              <span className="font-medium">user@example.com</span>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Miembro Desde</span>
              <span className="font-medium">Enero 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pedidos Totales</span>
              <span className="font-medium">3</span>
            </div>
          </div>
          <Button variant="outline" className="mt-6 bg-transparent">
            Cerrar Sesión
          </Button>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
