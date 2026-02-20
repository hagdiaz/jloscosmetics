import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { getAllPosts, getPostBySlug } from "@/lib/blog"

/* ---------- SSG ---------- */

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

/* ---------- Dynamic Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: "Articulo no encontrado | Jlo's Cosmetics" }
  }

  return {
    title: `${post.title} | Jlo's Cosmetics`,
    description: post.excerpt,
  }
}

/* ---------- Helpers ---------- */

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/* ---------- Page ---------- */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen font-serif">
      <article className="container mx-auto px-4 py-12 md:py-16">
        {/* Back link */}
        <Link
          href="/learn"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Aprender
        </Link>

        {/* Header */}
        <header className="mx-auto mb-10 max-w-3xl">
          <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {post.category}
          </span>

          <h1 className="mb-6 text-3xl font-medium tracking-tight text-balance leading-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span aria-hidden="true">{"/"}</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        {/* Featured image */}
        <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-sm">
          <div className="relative aspect-[16/9] w-full bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Body placeholder */}
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          <div className="space-y-5 text-base text-foreground leading-relaxed">
            <p>
              Este articulo esta en desarrollo. Cuando el endpoint del blog
              este disponible, el contenido completo se cargara
              automaticamente desde la API externa.
            </p>

            <p>
              La arquitectura actual permite reemplazar los datos mock con
              una sola linea de codigo en{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                /lib/blog.ts
              </code>
              , sin modificar ninguna otra parte del proyecto.
            </p>
          </div>

          {/* Back CTA */}
          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver todos los articulos
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
