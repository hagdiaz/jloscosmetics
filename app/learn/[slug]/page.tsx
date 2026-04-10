import { notFound } from "next/navigation"
import { getBlogPosts, BlogPost } from "@/lib/getBlogPosts"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { posts } = await getBlogPosts(1, 100)
  const post = posts.find((p: BlogPost) => p.slug === slug) // Cambiar a slug

  if (!post) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 font-serif">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {new Date(post.createdAt).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })} • The Ordinary
      </p>
      <article className="prose prose-lg max-w-full">
        <p>{post.content}</p>
      </article>
    </main>
  )
}
