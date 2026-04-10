"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BlogPost } from "@/lib/getBlogPosts"
import { fetchBlogPosts } from "@/lib/fetchBlogPosts"

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true)
      const initialPosts = await fetchBlogPosts(1)
      setPosts(initialPosts)
      setLoading(false)
      if (initialPosts.length < 9) {
        setHasMore(false)
      }
    }
    loadInitialPosts()
  }, [])

  const loadMore = async () => {
    if (loading || !hasMore || posts.length >= 100) return
    setLoading(true)
    const nextPage = currentPage + 1
    const newPosts = await fetchBlogPosts(nextPage)
    setPosts((prev) => [...prev, ...newPosts])
    setCurrentPage(nextPage)
    setLoading(false)
    if (newPosts.length < 9 || posts.length + newPosts.length >= 100) {
      setHasMore(false)
    }
  }

  return (
    <main className="min-h-screen font-serif">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 text-3xl font-semibold">Blog</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/learn/${post.slug}`}>
              <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition">
                {/* Image */}
                {post.image && (
                  <div className="h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                )}
                {/* Content */}
                <div className="flex flex-col grow p-6">
                  <h2 className="text-xl font-medium mb-2 group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-auto">
                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {hasMore && posts.length < 100 && (
          <div className="flex justify-center mt-8">
            <Button onClick={loadMore} disabled={loading}>
              {loading ? "Cargando..." : "Cargar más"}
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
