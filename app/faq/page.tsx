import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: "Preguntas Frecuentes - Jlo's Cosmetics",
  description: "Respuestas a las preguntas más comunes sobre nuestros productos y rutinas de cuidado de la piel.",
}

const faqs = [
  {
    question: "¿Cómo elijo los productos adecuados para mi tipo de piel?",
    answer:
      "Recomendamos usar nuestro Constructor de Rutinas para obtener una rutina personalizada según tu tipo de piel y preocupaciones. También puedes explorar nuestra tienda por categoría para encontrar productos específicos.",
  },
  {
    question: "¿Son sus productos aptos para piel sensible?",
    answer:
      "Muchos de nuestros productos están formulados pensando en la piel sensible. Busca productos en la categoría 'Sensibilidad y Enrojecimiento'. Siempre recomendamos hacer una prueba de parche antes de incorporar un nuevo producto a tu rutina.",
  },
  {
    question: "¿En qué orden debo aplicar los productos?",
    answer:
      "Seguimos el sistema de tres pasos: Preparar (limpieza), Tratar (serums y activos), y Sellar (hidratación y protección solar). Nuestro Constructor de Rutinas te ayuda a organizar los productos en el orden correcto.",
  },
  {
    question: "¿Puedo combinar varios serums?",
    answer:
      "Sí, pero con precaución. Algunos activos funcionan bien juntos (como niacinamida y ácido hialurónico), mientras que otros deben usarse en momentos diferentes (como retinol y vitamina C). Consulta las instrucciones de cada producto.",
  },
  {
    question: "¿Cuánto tiempo tarda en verse resultados?",
    answer:
      "La mayoría de los productos necesitan al menos 4-6 semanas de uso constante para mostrar resultados visibles. Ingredientes como el retinol pueden necesitar hasta 12 semanas. La consistencia es clave.",
  },
  {
    question: "¿Realizan envíos internacionales?",
    answer:
      "Actualmente estamos trabajando para expandir nuestras opciones de envío. Por favor, contacta con nuestro equipo para más información sobre disponibilidad en tu zona.",
  },
]

export default function FaqPage() {
  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 text-4xl font-medium tracking-tight">
            Preguntas Frecuentes
          </h1>
          <p className="mb-12 text-muted-foreground">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y rutinas de cuidado de la piel.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-lg border border-border bg-card p-6 text-center">
            <p className="mb-4 text-muted-foreground">
              {"¿No encuentras lo que buscas?"}
            </p>
            <Button asChild>
              <Link href="https://wa.me/+5359596970">Contactar con nosotros</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
