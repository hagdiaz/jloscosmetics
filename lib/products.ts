export interface Product {
  id: string
  name: string
  slug: string
  price: number
  keyIngredient: string
  benefit: string
  category: string[]
  step: string
  description: string
  usage: string
  ingredients: string[]
  size: string
  image: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Gentle Cleanser",
    slug: "gentle-cleanser",
    price: 18,
    keyIngredient: "Niacinamide 2%",
    benefit: "Removes impurities without stripping",
    category: ["dryness", "sensitivity"],
    step: "prep",
    description:
      "A pH-balanced gel cleanser that removes dirt, oil, and makeup while maintaining your skin's natural moisture barrier. Formulated with niacinamide to calm and support skin health.",
    usage: "Apply to damp skin morning and evening. Massage gently, then rinse thoroughly with lukewarm water.",
    ingredients: [
      "Water",
      "Glycerin",
      "Sodium Cocoyl Isethionate",
      "Niacinamide 2%",
      "Panthenol",
      "Allantoin",
      "Citric Acid",
    ],
    size: "150ml",
    image: "/minimalist-cleanser-bottle.jpg",
  },
  {
    id: "2",
    name: "Retinol Serum 0.5%",
    slug: "retinol-serum",
    price: 32,
    keyIngredient: "Retinol 0.5%",
    benefit: "Reduces fine lines and texture",
    category: ["aging", "tone"],
    step: "treat",
    description:
      "A stabilized retinol formula that targets signs of aging, uneven texture, and hyperpigmentation. Encapsulated delivery system minimizes irritation while maintaining efficacy.",
    usage:
      "Apply 2-3 drops to clean, dry skin in the evening only. Start 2-3 times per week, gradually increasing frequency. Always use SPF during the day.",
    ingredients: ["Water", "Propanediol", "Retinol 0.5%", "Squalane", "Tocopherol", "Lecithin", "Sodium Hyaluronate"],
    size: "30ml",
    image: "/serum-dropper-bottle-minimal.jpg",
  },
  {
    id: "3",
    name: "Niacinamide Serum 10%",
    slug: "niacinamide-serum",
    price: 24,
    keyIngredient: "Niacinamide 10%",
    benefit: "Minimizes pores and evens tone",
    category: ["acne", "tone"],
    step: "treat",
    description:
      "High-strength niacinamide with zinc to regulate sebum production, minimize pore appearance, and reduce redness. Suitable for congested and uneven skin.",
    usage:
      "Apply 3-4 drops to clean skin morning or evening. Can be used with other serums. Avoid direct acids in the same routine.",
    ingredients: ["Water", "Niacinamide 10%", "Zinc PCA 1%", "Panthenol", "Allantoin", "Tamarindus Indica Extract"],
    size: "30ml",
    image: "/niacinamide-serum-bottle.jpg",
  },
  {
    id: "4",
    name: "Vitamin C Serum 15%",
    slug: "vitamin-c-serum",
    price: 28,
    keyIngredient: "L-Ascorbic Acid 15%",
    benefit: "Brightens and protects",
    category: ["tone", "aging"],
    step: "treat",
    description:
      "Pure L-ascorbic acid at an optimal pH for maximum penetration and effectiveness. Brightens skin, fades dark spots, and provides antioxidant protection.",
    usage:
      "Apply 3-4 drops to clean skin in the morning. Allow to absorb fully before moisturizer. Store in a cool, dark place.",
    ingredients: ["Water", "L-Ascorbic Acid 15%", "Propanediol", "Ferulic Acid", "Vitamin E", "Sodium Hyaluronate"],
    size: "30ml",
    image: "/vitamin-c-serum-amber-bottle.jpg",
  },
  {
    id: "5",
    name: "Hyaluronic Acid Serum",
    slug: "hyaluronic-acid-serum",
    price: 22,
    keyIngredient: "Hyaluronic Acid 2%",
    benefit: "Deep hydration",
    category: ["dryness"],
    step: "treat",
    description:
      "Multi-molecular weight hyaluronic acid complex that hydrates at multiple skin depths. Plumps, smooths, and enhances moisture retention without heaviness.",
    usage: "Apply to damp skin morning and evening. Follow with moisturizer to seal in hydration.",
    ingredients: ["Water", "Sodium Hyaluronate", "Hyaluronic Acid 2%", "Panthenol", "Glycerin", "Pentylene Glycol"],
    size: "30ml",
    image: "/hyaluronic-acid-serum-clear-bottle.jpg",
  },
  {
    id: "6",
    name: "Salicylic Acid 2%",
    slug: "salicylic-acid",
    price: 20,
    keyIngredient: "Salicylic Acid 2%",
    benefit: "Clears congestion and breakouts",
    category: ["acne"],
    step: "treat",
    description:
      "BHA exfoliant that penetrates pores to dissolve oil and debris. Reduces blackheads, breakouts, and prevents future congestion without over-drying.",
    usage:
      "Apply to clean skin once daily, preferably in the evening. Start every other day if new to acids. Avoid with other strong actives.",
    ingredients: ["Water", "Salicylic Acid 2%", "Witch Hazel", "Niacinamide", "Panthenol", "Allantoin"],
    size: "30ml",
    image: "/salicylic-acid-treatment-bottle.jpg",
  },
  {
    id: "7",
    name: "Barrier Repair Moisturizer",
    slug: "barrier-repair-moisturizer",
    price: 26,
    keyIngredient: "Ceramide Complex",
    benefit: "Restores and protects barrier",
    category: ["dryness", "sensitivity"],
    step: "seal",
    description:
      "Rich yet lightweight moisturizer with a complete ceramide complex to repair and strengthen the skin barrier. Essential for maintaining healthy, resilient skin.",
    usage: "Apply to face and neck morning and evening as the final step. Can be layered over serums.",
    ingredients: [
      "Water",
      "Glycerin",
      "Squalane",
      "Ceramide NP",
      "Ceramide AP",
      "Ceramide EOP",
      "Cholesterol",
      "Niacinamide",
    ],
    size: "50ml",
    image: "/moisturizer-jar-minimal.jpg",
  },
  {
    id: "8",
    name: "Lightweight Daily Moisturizer",
    slug: "lightweight-moisturizer",
    price: 22,
    keyIngredient: "Squalane",
    benefit: "Hydrates without weight",
    category: ["acne", "sensitivity"],
    step: "seal",
    description:
      "Oil-free gel-cream that provides lasting hydration without clogging pores. Perfect for oily, combination, or acne-prone skin that needs moisture without heaviness.",
    usage: "Apply morning and evening after serums. Smooth over face and neck until absorbed.",
    ingredients: ["Water", "Glycerin", "Squalane", "Niacinamide", "Sodium Hyaluronate", "Panthenol", "Allantoin"],
    size: "50ml",
    image: "/gel-moisturizer-pump-bottle.jpg",
  },
  {
    id: "9",
    name: "Mineral Sunscreen SPF 50",
    slug: "mineral-sunscreen",
    price: 30,
    keyIngredient: "Zinc Oxide 20%",
    benefit: "Broad spectrum protection",
    category: ["sun"],
    step: "seal",
    description:
      "100% mineral sunscreen with zinc oxide for broad spectrum UVA/UVB protection. Lightweight tint adapts to most skin tones without white cast or greasiness.",
    usage: "Apply generously as the last step of your morning routine. Reapply every 2 hours when exposed to sun.",
    ingredients: ["Zinc Oxide 20%", "Water", "Glycerin", "Squalane", "Iron Oxides", "Niacinamide", "Tocopherol"],
    size: "50ml",
    image: "/sunscreen-tube-minimal-white.jpg",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.includes(category))
}

export function getProductsByStep(step: string): Product[] {
  return products.filter((p) => p.step === step)
}
