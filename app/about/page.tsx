import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-medium tracking-tight text-balance">Acerca de Jlo's Cosmetics</h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              El cuidado de la piel no debería ser complicado. Creemos en fórmulas transparentes, ingredientes clínicos
              y rutinas que realmente funcionan.
            </p>

            <p>
              Fundada en el principio de que la educación empodera mejores opciones, Clarity existe para desmitificar el
              cuidado de la piel. Sin relleno de marketing, sin mezclas propietarias ocultando lo que realmente estás
              usando, sin ingredientes innecesarios rellenando las fórmulas.
            </p>

            <p>
              Cada producto está diseñado para encajar en un sistema simple de 3 pasos: Preparar, Tratar, Sellar. Nos
              enfocamos en activos basados en evidencia en concentraciones efectivas, formulados al pH correcto para
              máxima penetración e irritación mínima.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="mb-3 text-lg font-medium">Nuestra Misión</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hacer el cuidado de la piel clínico accesible y comprensible para todos
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 text-lg font-medium">Nuestros Valores</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transparencia, eficacia, educación y simplicidad sobre todo lo demás
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 text-lg font-medium">Nuestra Promesa</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ingredientes honestos, concentraciones honestas, resultados honestos
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
