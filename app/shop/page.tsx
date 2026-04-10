import { Suspense } from "react"
import { getProducts } from "@/lib/getProducts"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"


interface Product {
  id: number
  name: string
  price: number
  description?: string
  image?: string
  stock: number // 👈 ESTO FALTABA
  reviewsCount: number
  rating: number
}
/**
 * ProductGrid - Muestra la grilla de productos
 */
function ProductGrid({ products }: { products: Array<{
  rating: number
  reviewsCount: number
  stock: number
  id: string | number
  name: string
  price: number
  description?: string
  image?: string
  agotado?: boolean
}> }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted-foreground">
          No hay productos disponibles en este momento.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Por favor, intenta nuevamente más tarde.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
          stock={product.stock} // 👈 CRÍTICO
          rating={product.rating}
          reviewsCount={product.reviewsCount}
        />
      ))}
    </div>
  )
}

/**
 * ShopContent - Contenido principal con datos de la API
 */
async function ShopContent() {
  const { products, error } = await getProducts()

  console.log("STORE RAW DATA:")
  console.log(JSON.stringify(products, null, 2))

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar los productos: {error}. Por favor, intenta nuevamente.
        </AlertDescription>
      </Alert>
    )
  }

  return <ProductGrid products={products} />
}

/**
 * ShopPage - Página principal de tienda
 */
export default function ShopPage() {
  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-medium tracking-tight">
            Catálogo de Productos
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Explora nuestra selección de productos dermatológicos de alta calidad,
            diseñados para satisfacer todas tus necesidades de cuidado de la piel.
          </p>
        </div>

        {/* Contenido con Suspense */}
        <Suspense
          fallback={
            <div className="space-y-6">
              {/* Skeleton de carga */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  Cargando productos...
                </p>
              </div>
            </div>
          }
        >
          <ShopContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
