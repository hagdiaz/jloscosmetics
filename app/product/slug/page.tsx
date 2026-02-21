import Image from "next/image"
import { notFound } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  stock: number
  agotado: boolean
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: "no-store"
  })

  if (!res.ok) notFound()

  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  const isInStock = product.stock > 0

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24">

      {/* Imagen */}
      <div className="flex justify-center p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Nombre */}
      <div className="px-6">
        <h1 className="text-lg font-semibold">{product.name}</h1>
      </div>

      {/* Precio + stock */}
      <div className="px-6 mt-4 flex items-center justify-between">
        <span className="text-2xl font-bold">
          ${product.price} CUP
        </span>

        {isInStock ? (
          <span className="text-green-500 text-sm">En stock</span>
        ) : (
          <span className="text-red-500 text-sm">Agotado</span>
        )}
      </div>

      {/* Botones */}
      <div className="px-6 mt-6 space-y-3">
        <button
          disabled={!isInStock}
          className={`w-full py-3 rounded-full ${
            isInStock
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isInStock ? "Agregar al carrito" : "Producto agotado"}
        </button>
      </div>

      {/* Descripción */}
      <div className="px-6 mt-8">
        <h2 className="font-semibold mb-2">Descripción</h2>
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {product.description}
        </p>
      </div>
    </div>
  )
}