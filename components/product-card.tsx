import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string | number
  name: string
  price: number
  description?: string
  image?: string
  agotado?: boolean
}

export const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
  agotado = false,
}: ProductCardProps) => {
  return (
    <Link href={`/shop/${id}`}>
      <Card className={`group h-full overflow-hidden transition-all relative ${agotado
          ? 'opacity-75 hover:shadow-md'
          : 'hover:shadow-lg hover:border-primary/50'
        }`}>
        {/* Imagen */}
        <div className="aspect-square overflow-hidden bg-muted relative">
          <Image
            src={image || "/placeholder.jpg"}
            alt={name || "Producto"}
            width={300}
            height={300}
            className={`h-full w-full object-cover transition-transform duration-300 ${agotado ? 'grayscale' : 'group-hover:scale-105'
              }`}
            priority={false}
          />

          {/* Overlay oscuro cuando está agotado */}
          {agotado && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="font-semibold text-lg">Agotado</p>
              </div>
            </div>
          )}

          {/* Etiqueta Agotado en esquina (alternativa de posicionamiento) */}
          {agotado && (
            <Badge
              variant="destructive"
              className="absolute bottom-3 left-3 px-2.5 py-1.5 text-xs font-bold shadow-md"
            >
              AGOTADO
            </Badge>
          )}
        </div>

        {/* Contenido */}
        <div className={`flex flex-col gap-3 p-4 sm:p-5 ${agotado ? 'opacity-70' : ''}`}>
          {/* Nombre */}
          <h3 className={`font-medium text-base leading-tight line-clamp-2 transition-colors ${agotado ? 'text-muted-foreground' : 'group-hover:text-primary'
            }`}>
            {name}
          </h3>

          {/* Descripción */}
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}

          {/* Precio */}
          <div className="mt-auto pt-2 border-t border-border">
            <p className={`text-lg font-semibold ${agotado ? 'line-through text-muted-foreground' : ''}`}>
              ${typeof price === 'number' ? Math.round(price) : price}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
