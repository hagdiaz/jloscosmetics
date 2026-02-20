import { NextResponse } from 'next/server'
import { getStoreProducts } from '@/lib/store'

/**
 * GET /api/store
 *
 * Public API endpoint that returns products from the external JLos Cosmetics API.
 * All logic lives in lib/store.ts — this route simply exposes it as an HTTP endpoint.
 */
export async function GET() {
  const result = await getStoreProducts()
  return NextResponse.json(result)
}
