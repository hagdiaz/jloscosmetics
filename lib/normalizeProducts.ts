export interface StoreProduct {
  id: number
  name: string
  price: number
  description: string
  image: string

  stock: number
  isOutOfStock: boolean

  rating: number
  reviewsCount: number

  category?: string
}

export function normalizeProduct(raw: any): StoreProduct {
  const stock = typeof raw.stock === "number" ? raw.stock : 0

  return {
    id: raw.id,
    name: raw.name || raw.title || "Producto sin nombre",
    price: typeof raw.price === "number" ? raw.price : 0,
    description: raw.description || "",
    image: raw.image || "/placeholder.jpg",

    // 🔥 lógica REAL
    stock,
    isOutOfStock: stock === 0,

    // 🔥 fallback inteligente
    rating: typeof raw.rating === "number" ? raw.rating : 0,
    reviewsCount: typeof raw.reviewsCount === "number" ? raw.reviewsCount : 0,

    category: raw.category || null,
  }
}