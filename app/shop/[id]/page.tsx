import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductById, getStoreProducts } from "@/lib/store"
import { ProductDetail } from "@/components/product-detail"
import { Footer } from "@/components/footer"


/* ------------------------------------------------------------------ */
/*  Allow any product ID at runtime (not only build-time known IDs)    */
/* ------------------------------------------------------------------ */

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const result = await getStoreProducts()
    if (!result.success) return []
    return result.data.map((p) => ({ id: String(p.id) }))
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ */
/*  Dynamic SEO metadata                                               */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  

  if (!product) {
    return { title: "Producto no encontrado | Jlo's Cosmetics" }
  }

  return {
    title: `${product.name} | Jlo's Cosmetics`,
    description:
      product.description?.slice(0, 160) ??
      `Compra ${product.name} en Jlo's Cosmetics.`,
    openGraph: {
      title: product.name,
      description: product.description ?? "",
      images: product.image ? [{ url: product.image }] : [],
    },
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  console.log("[v0] ProductPage rendering for id:", id)

  const product = await getProductById(id)
  console.log("[v0] Product fetched:", product ? product.name : "NOT FOUND")

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <ProductDetail product={product} />
      </div>
      <Footer />
    </main>
  )
}
