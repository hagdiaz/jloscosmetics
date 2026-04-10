interface ExternalProduct {
  id: string | number
  title?: string
  descripcion?: string
  price?: number
  image?: string
  visible?: boolean
  agotado?: boolean
  category?: string
  stock?: number
  reviewsCount?: number
  rating?: number
  [key: string]: unknown
}

export interface StoreProduct {
  reviewsCount: number
  rating: number
  id: string | number
  name: string
  price: number
  description?: string
  image?: string
  category?: string
  stock?: number
  agotado?: boolean
}

export interface StoreResult {
  success: boolean
  data: StoreProduct[]
  message?: string
}

/**
 * Fetches products directly from the external JLos Cosmetics API.
 * This function can be called from Server Components, Route Handlers,
 * or any server-side context without needing to go through an internal API route.
 *
 * Revalidates every hour by default.
 */
export async function getStoreProducts(): Promise<StoreResult> {
  try {
    const token = process.env.JLOS_TOKEN

    if (!token) {
      console.error('[store] JLOS_TOKEN is not configured')
      return {
        success: false,
        data: [],
        message: 'Configuration error',
      }
    }

    const externalApiUrl = 'https://roumenu.vercel.app/api/data/jloscosmetics'

    const response = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {
        'x-editor-key': token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error('[store] External API error:', response.status)
      return {
        success: false,
        data: [],
        message: `External API returned ${response.status}`,
      }
    }

    const json: unknown = await response.json()

    // Handle different response shapes
    let rawProducts: ExternalProduct[] = []

    if (Array.isArray(json)) {
      rawProducts = json
    } else if (json && typeof json === 'object') {
      const obj = json as Record<string, unknown>
      if (Array.isArray(obj.data)) {
        rawProducts = obj.data as ExternalProduct[]
      } else if (obj.data && typeof obj.data === 'object') {
        const nested = obj.data as Record<string, unknown>
        if (Array.isArray(nested.products)) {
          rawProducts = nested.products as ExternalProduct[]
        }
      }
    }

    // Normalize products (include agotado status)
    const products: StoreProduct[] = rawProducts
      .filter((p) => p.visible !== false)
      .map((p) => ({
        id: p.id,
        name: p.title ?? 'Producto sin nombre',
        price: typeof p.price === 'number' ? p.price : 0,
        description: p.descripcion ?? '',
        image: p.image ?? '/placeholder.svg',
        category: typeof p.category === 'string' ? p.category : undefined,
        stock: typeof p.stock === 'number' ? p.stock : undefined,
        agotado: p.agotado === true,
      }))

    return {
      success: true,
      data: products,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[store] Error fetching products:', message)
    return {
      success: false,
      data: [],
      message,
    }
  }
}

/**
 * Fetches a single product by ID.
 *
 * --- SWAP POINT ---
 * When a dedicated single-product endpoint exists, replace the body of this
 * function with a direct fetch to that endpoint instead of fetching all products.
 * Example:
 *   const res = await fetch(`https://api.example.com/products/${id}`, { ... })
 *   return res.json()
 * -----------------
 */
export async function getProductById(
  id: string,
): Promise<StoreProduct | null> {
  const result = await getStoreProducts()
  console.log("[v0] getProductById called with id:", id)
  console.log("[v0] getStoreProducts success:", result.success, "count:", result.data.length)
  if (!result.success) {
    console.log("[v0] getStoreProducts failed:", result.message)
    return null
  }
  if (result.data.length > 0) {
    console.log("[v0] Available IDs:", result.data.map((p) => `${p.id} (${typeof p.id})`).join(", "))
  }
  const found = result.data.find((p) => String(p.id) === id) ?? null
  console.log("[v0] Product found:", found ? found.name : "NULL")
  return found
}
