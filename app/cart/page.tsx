"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  keyIngredient: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Limpiador Suave",
      price: 18,
      quantity: 1,
      image: "/minimalist-cleanser-bottle.jpg",
      keyIngredient: "Niacinamida 2%",
    },
    {
      id: "2",
      name: "Suero de Retinol 0.5%",
      price: 32,
      quantity: 1,
      image: "/serum-dropper-bottle-minimal.jpg",
      keyIngredient: "Retinol 0.5%",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen font-serif">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-muted-foreground" />
            <h1 className="mb-4 text-3xl font-medium">Tu carrito está vacío</h1>
            <p className="mb-8 text-muted-foreground">Comienza a construir tu rutina con productos que funcionan.</p>
            <Button size="lg" asChild>
              <Link href="/shop">Explorar Productos</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-medium tracking-tight">Carrito de Compras</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <div className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                            {item.keyIngredient}
                          </div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="mt-2 text-lg font-medium">${item.price}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-5 w-5" />
                          <span className="sr-only">Eliminar artículo</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-medium">Resumen del Pedido</h2>

              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-medium">{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-medium">${total.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Agrega ${(50 - subtotal).toFixed(2)} más para envío gratis
                </p>
              )}

              <Button size="lg" className="mt-6 w-full">
                Proceder al Pago
              </Button>

              <Button variant="outline" size="lg" className="mt-3 w-full bg-transparent" asChild>
                <Link href="/shop">Continuar Comprando</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
