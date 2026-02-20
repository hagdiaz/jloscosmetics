import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card font-serif">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">Tienda</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/shop?category=aging"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Envejecimiento y Textura
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=acne"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Acné y Congestión
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=tone"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tono Desigual
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=dryness"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sequedad y Barrera
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">Aprender</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ingredientes
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rutinas
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">Empresa</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">Boletín</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Obtén consejos de cuidado de la piel en tu bandeja de entrada
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Correo electrónico" className="h-10 text-sm" />
              <Button type="submit" size="sm">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 Jlo&apos;s Cosmetics. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
