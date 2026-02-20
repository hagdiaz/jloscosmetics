import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Package, ShoppingBag } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getStoreProducts } from '@/lib/store'

/**
 * Server Component that fetches products directly via the shared store logic.
 * No internal fetch calls — calls getStoreProducts() directly.
 */
export async function StoreDataComponent() {
  const result = await getStoreProducts()

  if (!result.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar productos</AlertTitle>
        <AlertDescription>
          {result.message || 'No se pudieron cargar los datos de la tienda'}
        </AlertDescription>
      </Alert>
    )
  }

  const products = result.data

  if (products.length === 0) {
    return (
      <Alert>
        <Package className="h-4 w-4" />
        <AlertTitle>{'Catálogo vacío'}</AlertTitle>
        <AlertDescription>
          {'Aún no hay productos en el catálogo.'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con contador */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">
            Productos Disponibles
          </h3>
        </div>
        <Badge variant="secondary">
          {products.length} {products.length === 1 ? 'producto' : 'productos'}
        </Badge>
      </div>

      {/* Grid de productos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            {product.image && (
              <div className="aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}

            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="line-clamp-2 text-base">
                  {product.name}
                </CardTitle>
                {product.category && (
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {product.category}
                  </Badge>
                )}
              </div>

              {product.description && (
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>
                  {typeof product.stock === 'number' && (
                    <p className="text-xs text-muted-foreground">
                      {product.stock > 0 ? (
                        <span className="text-green-600">
                          En stock ({product.stock})
                        </span>
                      ) : (
                        <span className="text-red-600">Agotado</span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
