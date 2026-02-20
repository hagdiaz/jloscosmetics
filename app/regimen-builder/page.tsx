"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { ArrowRight, Check } from "lucide-react"
import { products, type Product } from "@/lib/products"

type Concern = "aging" | "acne" | "tone" | "dryness" | "sensitivity"

interface RegimenRecommendation {
  prep: Product
  treat: Product
  seal: Product
}

const concerns = [
  {
    id: "aging" as Concern,
    name: "Envejecimiento y Textura",
    description: "Líneas finas, arrugas, textura áspera",
  },
  {
    id: "acne" as Concern,
    name: "Acné y Congestión",
    description: "Brotes, poros obstruidos, imperfecciones",
  },
  {
    id: "tone" as Concern,
    name: "Tono Desigual",
    description: "Manchas oscuras, hiperpigmentación",
  },
  {
    id: "dryness" as Concern,
    name: "Sequedad y Barrera",
    description: "Deshidratación, barrera comprometida",
  },
  {
    id: "sensitivity" as Concern,
    name: "Sensibilidad y Enrojecimiento",
    description: "Irritación, piel reactiva",
  },
]

function getRegimenForConcern(concern: Concern): RegimenRecommendation {
  const prepProduct = products.find((p) => p.step === "prep" && p.category.includes(concern)) || products[0]
  const treatProduct = products.find((p) => p.step === "treat" && p.category.includes(concern)) || products[1]
  const sealProduct = products.find((p) => p.step === "seal" && p.category.includes(concern)) || products[6]

  return {
    prep: prepProduct,
    treat: treatProduct,
    seal: sealProduct,
  }
}

export default function RegimenBuilderPage() {
  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null)
  const [recommendation, setRecommendation] = useState<RegimenRecommendation | null>(null)

  const handleSelectConcern = (concern: Concern) => {
    setSelectedConcern(concern)
    const regimen = getRegimenForConcern(concern)
    setRecommendation(regimen)
  }

  const handleReset = () => {
    setSelectedConcern(null)
    setRecommendation(null)
  }

  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-medium tracking-tight text-balance">Construye Tu Rutina</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Selecciona tu preocupación principal y te sugeriremos una rutina simple de 3 pasos
          </p>
        </div>

        {/* Step 1: Select Concern */}
        {!selectedConcern && (
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-xl font-medium">¿Cuál es tu principal preocupación de piel?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {concerns.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => handleSelectConcern(concern.id)}
                  className="group rounded-sm border border-border bg-card p-6 text-left transition-colors hover:bg-accent"
                >
                  <h3 className="mb-2 text-lg font-medium">{concern.name}</h3>
                  <p className="text-sm text-muted-foreground">{concern.description}</p>
                  <ArrowRight className="mt-4 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Show Recommendation */}
        {recommendation && selectedConcern && (
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-medium">Tu Rutina Recomendada</h2>
                <p className="text-muted-foreground">
                  Para {concerns.find((c) => c.id === selectedConcern)?.name.toLowerCase()}
                </p>
              </div>
              <Button variant="outline" onClick={handleReset}>
                Empezar de Nuevo
              </Button>
            </div>

            <div className="mb-12 grid gap-6 md:grid-cols-3">
              {/* Prep */}
              <Card className="overflow-hidden">
                <div className="bg-secondary p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary-foreground text-xs font-medium text-secondary">
                      01
                    </div>
                    <h3 className="font-medium text-secondary-foreground">Preparar</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 aspect-square overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={recommendation.prep.image || "/placeholder.svg"}
                      alt={recommendation.prep.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                    {recommendation.prep.keyIngredient}
                  </div>
                  <h4 className="mb-2 text-lg font-medium">{recommendation.prep.name}</h4>
                  <p className="mb-4 text-sm text-muted-foreground">{recommendation.prep.benefit}</p>
                  <p className="mb-4 text-lg font-medium">${recommendation.prep.price}</p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href={`/shop/${recommendation.prep.slug}`}>Ver Detalles</Link>
                  </Button>
                </div>
              </Card>

              {/* Treat */}
              <Card className="overflow-hidden">
                <div className="bg-secondary p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary-foreground text-xs font-medium text-secondary">
                      02
                    </div>
                    <h3 className="font-medium text-secondary-foreground">Tratar</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 aspect-square overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={recommendation.treat.image || "/placeholder.svg"}
                      alt={recommendation.treat.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                    {recommendation.treat.keyIngredient}
                  </div>
                  <h4 className="mb-2 text-lg font-medium">{recommendation.treat.name}</h4>
                  <p className="mb-4 text-sm text-muted-foreground">{recommendation.treat.benefit}</p>
                  <p className="mb-4 text-lg font-medium">${recommendation.treat.price}</p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href={`/shop/${recommendation.treat.slug}`}>Ver Detalles</Link>
                  </Button>
                </div>
              </Card>

              {/* Seal */}
              <Card className="overflow-hidden">
                <div className="bg-secondary p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary-foreground text-xs font-medium text-secondary">
                      03
                    </div>
                    <h3 className="font-medium text-secondary-foreground">Sellar</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 aspect-square overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={recommendation.seal.image || "/placeholder.svg"}
                      alt={recommendation.seal.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                    {recommendation.seal.keyIngredient}
                  </div>
                  <h4 className="mb-2 text-lg font-medium">{recommendation.seal.name}</h4>
                  <p className="mb-4 text-sm text-muted-foreground">{recommendation.seal.benefit}</p>
                  <p className="mb-4 text-lg font-medium">${recommendation.seal.price}</p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href={`/shop/${recommendation.seal.slug}`}>Ver Detalles</Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Add to Cart Summary */}
            <Card className="bg-accent p-8">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="mb-2 text-xl font-medium">Rutina Completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Obtén los tres productos para tu régimen personalizado
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-3xl font-medium">
                      ${recommendation.prep.price + recommendation.treat.price + recommendation.seal.price}
                    </p>
                  </div>
                  <Button size="lg">
                    Agregar Todo al Carrito
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* How to Use */}
            <div className="mt-12">
              <h3 className="mb-6 text-center text-2xl font-medium">Cómo usar tu rutina</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-secondary text-secondary-foreground">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="mb-2 text-lg font-medium">Mañana</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Limpia → Tratamiento → Humectante → Protector Solar. Mantenlo simple y consistente.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-secondary text-secondary-foreground">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="mb-2 text-lg font-medium">Noche</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Limpia → Tratamiento → Humectante. Tu piel se repara a sí misma durante la noche.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-secondary text-secondary-foreground">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="mb-2 text-lg font-medium">Sé Paciente</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Los resultados toman 4-8 semanas. La consistencia importa más que la perfección.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
