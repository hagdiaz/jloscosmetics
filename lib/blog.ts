import type { BlogPost } from "@/types/blog"

/**
 * Mock blog posts — temporary data until the external endpoint is ready.
 *
 * WHEN THE ENDPOINT IS AVAILABLE:
 * 1. Add BLOG_API_URL to your environment variables.
 * 2. Uncomment the fetch call inside getAllPosts().
 * 3. Delete the MOCK_POSTS array.
 * Nothing else in the project needs to change.
 */
const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "peptidos-que-hacen",
    title: "Peptidos: lo que realmente hacen (y cuando si valen la pena en tu rutina)",
    excerpt:
      "Los peptidos estan en tendencia, pero no todos cumplen lo que prometen. Te explicamos cuales tienen evidencia real y como incorporarlos sin desperdiciar tu dinero.",
    image: "/images/blog-1.jpg",
    category: "Ingredientes",
    author: "Jlo's Cosmetics",
    publishedAt: "2026-02-16",
  },
  {
    id: "2",
    slug: "niacinamida-guia-completa",
    title: "La ciencia de la niacinamida: por que funciona para casi todo tipo de piel",
    excerpt:
      "La niacinamida es uno de los activos mas versatiles en skincare. Descubre como actua sobre poros, textura, manchas y barrera cutanea.",
    image: "/images/blog-2.jpg",
    category: "Ingredientes",
    author: "Jlo's Cosmetics",
    publishedAt: "2026-02-12",
  },
  {
    id: "3",
    slug: "primera-rutina-skincare",
    title: "Construyendo tu primera rutina: 3 pasos que realmente importan",
    excerpt:
      "Olvida las rutinas de 10 pasos. Empieza con estos tres esenciales y construye desde ahi con confianza.",
    image: "/images/blog-3.jpg",
    category: "Rutinas",
    author: "Jlo's Cosmetics",
    publishedAt: "2026-02-08",
  },
  {
    id: "4",
    slug: "exfoliacion-quimica-vs-fisica",
    title: "Exfoliacion quimica vs fisica: cual es mejor para tu piel",
    excerpt:
      "No todas las exfoliaciones son iguales. Aprende las diferencias clave y elige la que tu piel realmente necesita.",
    image: "/images/blog-4.jpg",
    category: "Educacion",
    author: "Jlo's Cosmetics",
    publishedAt: "2026-02-04",
  },
  {
    id: "5",
    slug: "ph-importa-skincare",
    title: "Por que el pH importa en el cuidado de la piel",
    excerpt:
      "El equilibrio de pH afecta la efectividad de tus productos y la salud de tu barrera cutanea. Entender esto cambia todo.",
    image: "/images/blog-5.jpg",
    category: "Ciencia",
    author: "Jlo's Cosmetics",
    publishedAt: "2026-01-28",
  },
  {
    id: "6",
    slug: "combinar-activos-seguros",
    title: "Combinando activos de forma segura: guia practica",
    excerpt:
      "Retinol con niacinamida? Vitamina C con AHA? Te decimos que combinaciones funcionan y cuales deberias evitar.",
    image: "/images/blog-6.jpg",
    category: "Rutinas",
    author: "Jlo's Cosmetics",
    publishedAt: "2026-01-22",
  },
]

export async function getAllPosts(): Promise<BlogPost[]> {
  // ---------------------------------------------------------------
  // FUTURO: Reemplazar mock con fetch al endpoint real.
  //
  // const res = await fetch(process.env.BLOG_API_URL!, {
  //   next: { revalidate: 3600 },
  // })
  // return res.json()
  // ---------------------------------------------------------------

  return MOCK_POSTS
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getAllPosts()
  return posts.find((p) => p.slug === slug)
}
