"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Minus,
  Plus,
  ShoppingCart,
  Star,
  StarHalf,
  Facebook,
  Twitter,
  LinkIcon,
  Check,
} from "lucide-react"
import type { StoreProduct } from "@/lib/store"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProductDetailProps {
  product: StoreProduct
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Format price with thousands separator */
function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

/** Render star rating (supports half stars) */
function StarRating({ rating }: { rating: number }) {
  const stars = []
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5

  for (let i = 0; i < full; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="h-4 w-4 fill-amber-400 text-amber-400"
      />,
    )
  }
  if (hasHalf) {
    stars.push(
      <StarHalf
        key="half"
        className="h-4 w-4 fill-amber-400 text-amber-400"
      />,
    )
  }
  const empty = 5 - full - (hasHalf ? 1 : 0)
  for (let i = 0; i < empty; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="h-4 w-4 text-border" />,
    )
  }

  return <div className="flex items-center gap-0.5">{stars}</div>
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [copied, setCopied] = useState(false)

  const isOutOfStock = product.agotado === true
  const rating = 4.5 // placeholder until reviews API exists  
  const reviewCount: number = 24

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="font-serif">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/shop">Tienda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {product.category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/shop?category=${product.category}`}>
                    {product.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ---- MAIN GRID: image left / details right on desktop ---- */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* IMAGE */}
        <div className="relative w-full lg:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover ${isOutOfStock ? "grayscale opacity-80" : ""}`}
              priority
            />

            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Badge
                  variant="destructive"
                  className="px-4 py-2 text-sm font-bold shadow-lg"
                >
                  AGOTADO
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex w-full flex-col lg:w-1/2">
          {/* Name */}
          <h1 className="mb-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mb-4 flex items-center gap-2">
            <StarRating rating={rating} />
            <span className="text-sm text-muted-foreground">
              {rating} ({reviewCount} {reviewCount === 1 ? "resena" : "resenas"})
            </span>
          </div>

          {/* Price + Stock */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`text-3xl font-semibold ${isOutOfStock ? "text-muted-foreground line-through" : "text-foreground"}`}
            >
              {formatPrice(product.price)}
            </span>

            {isOutOfStock ? (
              <Badge variant="destructive" className="text-xs">
                Agotado
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-emerald-600/30 bg-emerald-50 text-emerald-700 text-xs"
              >
                En stock
              </Badge>
            )}
          </div>

          {/* Short description */}
          {product.description && (
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {product.description}
            </p>
          )}

          <Separator className="mb-6" />

          {/* Quantity + Add to Cart */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Quantity selector */}
            <div className="flex items-center rounded-sm border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                disabled={isOutOfStock || quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Reducir cantidad"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="flex h-10 w-12 items-center justify-center text-sm font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                disabled={isOutOfStock}
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="flex-1 sm:flex-initial"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isOutOfStock ? "No disponible" : "Agregar al carrito"}
            </Button>
          </div>

          {/* Share */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Compartir
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href)
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
                }}
                aria-label="Compartir en Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href)
                  const text = encodeURIComponent(product.name)
                  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
                }}
                aria-label="Compartir en Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={handleCopyLink}
                aria-label="Copiar enlace"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Separator className="mb-6 lg:hidden" />
        </div>
      </div>

      {/* ---- TABS: below the fold ---- */}
      <div className="mt-8 md:mt-12">
        <Tabs defaultValue="descripcion" className="w-full">
          <TabsList className="flex w-full flex-wrap h-auto gap-1 bg-transparent p-0 border-b border-border rounded-none">
            <TabsTrigger
              value="descripcion"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {"Descripcion"}
            </TabsTrigger>
            <TabsTrigger
              value="ingredientes"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Ingredientes
            </TabsTrigger>
            <TabsTrigger
              value="beneficios"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Beneficios
            </TabsTrigger>
            <TabsTrigger
              value="uso"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {"Como usar"}
            </TabsTrigger>
            <TabsTrigger
              value="detalles"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Detalles
            </TabsTrigger>
            <TabsTrigger
              value="resenas"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {"Resenas"}
            </TabsTrigger>
          </TabsList>

          {/* Descripcion */}
          <TabsContent value="descripcion" className="pt-6">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {product.description || "Descripcion no disponible."}
            </p>
          </TabsContent>

          {/* Ingredientes */}
          <TabsContent value="ingredientes" className="pt-6">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Consulta el empaque del producto para la lista completa de
              ingredientes. Todos nuestros productos son formulados sin
              parabenos, sulfatos ni fragancias artificiales.
            </p>
          </TabsContent>

          {/* Beneficios */}
          <TabsContent value="beneficios" className="pt-6">
            <ul className="max-w-2xl list-inside list-disc space-y-2 text-sm text-muted-foreground md:text-base">
              <li>Formulado con ingredientes de grado dermatologico</li>
              <li>Apto para todo tipo de piel</li>
              <li>Sin fragancias artificiales</li>
              <li>Probado bajo control dermatologico</li>
            </ul>
          </TabsContent>

          {/* Como usar */}
          <TabsContent value="uso" className="pt-6">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  1
                </span>
                <p className="text-sm text-muted-foreground md:text-base">
                  Limpia tu rostro con agua tibia antes de aplicar.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  2
                </span>
                <p className="text-sm text-muted-foreground md:text-base">
                  Aplica una cantidad adecuada sobre la piel con movimientos
                  suaves y circulares.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  3
                </span>
                <p className="text-sm text-muted-foreground md:text-base">
                  Usa diariamente para mejores resultados. Complementa con
                  protector solar durante el dia.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Detalles (tabla) */}
          <TabsContent value="detalles" className="pt-6">
            <div className="max-w-md overflow-hidden rounded-sm border border-border">
              <table className="w-full text-sm">
                <tbody>
                  <DetailRow label="Nombre" value={product.name} />
                  {product.category && (
                    <DetailRow label="Categoria" value={product.category} />
                  )}
                  <DetailRow
                    label="Precio"
                    value={formatPrice(product.price)}
                  />
                  <DetailRow
                    label="Disponibilidad"
                    value={isOutOfStock ? "Agotado" : "En stock"}
                  />
                  {typeof product.stock === "number" && (
                    <DetailRow
                      label="Unidades"
                      value={String(product.stock)}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Resenas */}
          <TabsContent value="resenas" className="pt-6">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-4xl font-semibold text-foreground">
                  {rating}
                </span>
                <div>
                  <StarRating rating={rating} />
                  <p className="mt-1 text-sm text-muted-foreground">
                    Basado en {reviewCount} reseñas
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Las reseñas de clientes verificados se mostraran aqui
                proximamente.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/* Small helper for the details table */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="bg-muted/50 px-4 py-2.5 font-medium text-foreground">
        {label}
      </td>
      <td className="px-4 py-2.5 text-muted-foreground">{value}</td>
    </tr>
  )
}
