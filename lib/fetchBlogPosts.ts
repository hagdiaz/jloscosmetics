'use server'

export async function fetchBlogPosts(page: number) {
  try {
    const res = await fetch(
      `https://roumenu.vercel.app/api/blog/jloscosmetics?page=${page}&limit=9`,
      {
        headers: { "x-editor-key": process.env.JLOS_TOKEN! },
      }
    )
    const { posts } = await res.json()
    return posts
  } catch (err) {
    console.error("Error fetching posts:", err)
    return []
  }
}