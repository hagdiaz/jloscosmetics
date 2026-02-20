import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Aprender | Jlo's Cosmetics",
  description:
    "Articulos sobre ingredientes, rutinas y ciencia del cuidado de la piel. Informacion clara y sin marketing.",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function LearnPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="mb-4 text-4xl font-medium tracking-tight text-balance md:text-5xl">
            Aprender
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            Entendiendo ingredientes y rutinas para mejores decisiones de
            cuidado de la piel
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/learn/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:bg-accent"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <span className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {post.category}
                </span>

                <h2 className="mb-2 text-lg font-medium leading-snug text-foreground md:text-xl">
                  {post.title}
                </h2>

                <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
