import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen font-serif">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
            Cuidado de la piel que tiene sentido
          </h1>
          <p className="mb-8 text-lg text-muted-foreground text-balance md:text-xl">
            Rutinas simples y efectivas basadas en fórmulas transparentes y resultados clínicos. Sin relleno de
            marketing, solo lo que funciona.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="rounded-3xl" size="lg" asChild>
              <Link href="/regimen-builder">
                Construye Tu Rutina
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button className="rounded-4xl" size="lg" variant="outline" asChild>
              <Link href="/shop">Compra Todos los Productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Regimen Builder Preview */}
      <section className="border-y border-border bg-card py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-balance md:text-4xl">
              Tu rutina, simplificada
            </h2>
            <p className="mb-12 text-muted-foreground text-balance">
              Toda rutina efectiva sigue tres pasos esenciales. Sin sistemas complicados, sin confusión.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <Card className="p-8 text-left">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-secondary text-secondary-foreground text-sm font-medium rounded-xl">
                  01
                </div>
                <h3 className="mb-3 text-xl font-medium">Preparar</h3>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  Limpia y equilibra para preparar tu piel para el tratamiento. Elimina impurezas y equilibra el pH.
                </p>
                <Button variant="ghost" size="sm" asChild className="px-0">
                  <Link href="/shop?step=prep">
                    Ver Productos
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </Card>

              {/* Step 2 */}
              <Card className="p-8 text-left">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-secondary text-secondary-foreground text-sm font-medium rounded-xl">
                  02
                </div>
                <h3 className="mb-3 text-xl font-medium">Tratar</h3>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  Aborda preocupaciones específicas con ingredientes activos. Aquí es donde sucede el cambio real.
                </p>
                <Button variant="ghost" size="sm" asChild className="px-0">
                  <Link href="/shop?step=treat">
                    Ver Productos
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </Card>

              {/* Step 3 */}
              <Card className="p-8 text-left">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-secondary text-secondary-foreground text-sm font-medium rounded-xl">
                  03
                </div>
                <h3 className="mb-3 text-xl font-medium">Sellar</h3>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  Hidrata y protege. Sella el tratamiento y mantén tu barrera cutánea.
                </p>
                <Button variant="ghost" size="sm" asChild className="px-0">
                  <Link href="/shop?step=seal">
                    Ver Productos
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Need */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-medium tracking-tight md:text-4xl">{"Compra por afección\n"}  </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/shop?category=aging"
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-colors hover:bg-accent"
            >
              <h3 className="mb-2 text-lg font-medium">Envejecimiento y Textura</h3>
              <p className="text-sm text-muted-foreground">Líneas finas, arrugas, textura áspera</p>
              <ArrowRight className="absolute right-6 top-8 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/shop?category=acne"
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-colors hover:bg-accent"
            >
              <h3 className="mb-2 text-lg font-medium">Acné y Congestión</h3>
              <p className="text-sm text-muted-foreground">Brotes, poros obstruidos, imperfecciones</p>
              <ArrowRight className="absolute right-6 top-8 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/shop?category=tone"
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-colors hover:bg-accent"
            >
              <h3 className="mb-2 text-lg font-medium">Tono Desigual</h3>
              <p className="text-sm text-muted-foreground">Manchas oscuras, hiperpigmentación</p>
              <ArrowRight className="absolute right-6 top-8 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/shop?category=dryness"
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-colors hover:bg-accent"
            >
              <h3 className="mb-2 text-lg font-medium">Sequedad y Barrera</h3>
              <p className="text-sm text-muted-foreground">Deshidratación, barrera comprometida</p>
              <ArrowRight className="absolute right-6 top-8 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/shop?category=sensitivity"
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-colors hover:bg-accent"
            >
              <h3 className="mb-2 text-lg font-medium">Sensibilidad y Enrojecimiento</h3>
              <p className="text-sm text-muted-foreground">Irritación, piel reactiva, rosácea</p>
              <ArrowRight className="absolute right-6 top-8 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/shop?category=sun"
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-colors hover:bg-accent"
            >
              <h3 className="mb-2 text-lg font-medium">Protección Solar</h3>
              <p className="text-sm text-muted-foreground">Defensa diaria, protección UV</p>
              <ArrowRight className="absolute right-6 top-8 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Education Block */}
      <section className="border-y border-border bg-muted py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">Entiende lo que usas</h2>
            <p className="mb-8 text-muted-foreground leading-relaxed">
              El buen cuidado de la piel comienza con entender los ingredientes. Aprende qué funciona, por qué funciona
              y cómo usarlo efectivamente. Sin gatekeeping, sin misterio.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link href="/learn">
                Lee el Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-medium tracking-tight md:text-4xl">Nuestro enfoque</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-secondary-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-medium">Fórmulas transparentes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cada ingrediente listado. Cada concentración revelada. Sin mezclas propietarias que oculten lo que
                realmente estás usando.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-secondary-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-medium">Sin ingredientes innecesarios</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fórmulas enfocadas en eficacia. Sin rellenos, sin fragancia por el simple hecho de serlo, sin
                ingredientes que no necesites.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-secondary-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-medium">Rutina sobre hype</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La consistencia vence a las tendencias. Diseñamos productos que funcionan juntos como un sistema, no
                milagros independientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
