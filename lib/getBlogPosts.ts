export interface BlogPost {
  id: string
  title: string
  content: string
  createdAt: string
  excerpt?: string
  // demás campos según tu API
}

export async function getBlogPosts(page = 1, limit = 9): Promise<{ posts: BlogPost[] }> {
  try {
    const res = await fetch(
      `https://roumenu.vercel.app/api/blog/jloscosmetics?page=${page}&limit=${limit}`,
      {
        headers: { "x-editor-key": process.env.JLOS_TOKEN! },
        cache: "no-store", // datos frescos cada vez (ajusta según necesites)
      }
    );
    const { posts } = await res.json();
    return { posts };
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    return { posts: [] };
  }
}
