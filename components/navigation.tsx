"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-medium tracking-tight text-foreground font-serif">
          Jlo's Cosmetics
        </Link>

        <div className="hidden items-center gap-8 md:flex font-serif">
          <Link
            href="/regimen-builder"
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Construye Tu Rutina
          </Link>
          <Link
            href="/shop"
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Tienda
          </Link>
          <Link
            href="/learn"
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Aprender
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Acerca de
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Cuenta</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito de Compras</span>
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
