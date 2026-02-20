import { getStoreProducts, type StoreProduct } from '@/lib/store'

export type Product = StoreProduct

/**
 * Fetches products directly from the shared store logic.
 * No internal fetch calls — used by Server Components like /shop.
 */
export async function getProducts(): Promise<{
  products: Product[]
  error?: string
}> {
  const result = await getStoreProducts()

  if (!result.success) {
    return { products: [], error: result.message ?? 'Unknown error' }
  }

  return { products: result.data }
}
