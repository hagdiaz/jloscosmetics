'use server'

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  stock: number
  reviewsCount: number
  rating: number
}

import { normalizeProduct, StoreProduct } from "./normalizeProducts"

export async function getProducts(): Promise<{
  products: StoreProduct[]
  error?: string
}> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/store`, {
      cache: "no-store",
    })

    const data = await response.json()

    if (!data.success) {
      return {
        products: [],
        error: data.message || "Error fetching products",
      }
    }

    const rawProducts = Array.isArray(data.data) ? data.data : []

    const products = rawProducts.map(normalizeProduct)

    return { products }

  } catch (error) {
    return {
      products: [],
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}