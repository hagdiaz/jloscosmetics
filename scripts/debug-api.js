// Debug: call the exact same API that store.ts calls
const token = process.env.JLOS_TOKEN

console.log("=== DEBUG API ===")
console.log("JLOS_TOKEN exists:", !!token)
console.log("JLOS_TOKEN length:", token ? token.length : 0)

if (!token) {
  console.log("ERROR: No JLOS_TOKEN found. Exiting.")
  process.exit(1)
}

const url = 'https://roumenu.vercel.app/api/data/jloscosmetics'
console.log("Fetching:", url)

try {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-editor-key': token,
      'Content-Type': 'application/json',
    },
  })

  console.log("HTTP Status:", res.status)
  console.log("HTTP OK:", res.ok)

  const text = await res.text()
  console.log("Raw response length:", text.length)
  console.log("Raw response (first 2000 chars):", text.substring(0, 2000))

  // Try to parse
  try {
    const json = JSON.parse(text)
    console.log("\n=== PARSED JSON ===")
    console.log("Type:", typeof json)
    console.log("Is Array:", Array.isArray(json))
    
    if (Array.isArray(json)) {
      console.log("Array length:", json.length)
      if (json.length > 0) {
        console.log("First item keys:", Object.keys(json[0]))
        console.log("First item:", JSON.stringify(json[0], null, 2))
        console.log("\nAll IDs and types:")
        json.forEach((p, i) => {
          console.log(`  [${i}] id=${p.id} (${typeof p.id}), title="${p.title}", visible=${p.visible}, agotado=${p.agotado}`)
        })
      }
    } else if (json && typeof json === 'object') {
      console.log("Object keys:", Object.keys(json))
      
      if (json.data) {
        console.log("json.data type:", typeof json.data)
        console.log("json.data is Array:", Array.isArray(json.data))
        
        if (Array.isArray(json.data)) {
          console.log("json.data length:", json.data.length)
          if (json.data.length > 0) {
            console.log("First item keys:", Object.keys(json.data[0]))
            console.log("First item:", JSON.stringify(json.data[0], null, 2))
            console.log("\nAll IDs and types:")
            json.data.forEach((p, i) => {
              console.log(`  [${i}] id=${p.id} (${typeof p.id}), title="${p.title}", visible=${p.visible}, agotado=${p.agotado}`)
            })
          }
        } else if (json.data.products && Array.isArray(json.data.products)) {
          console.log("json.data.products length:", json.data.products.length)
          if (json.data.products.length > 0) {
            console.log("First item keys:", Object.keys(json.data.products[0]))
            console.log("First item:", JSON.stringify(json.data.products[0], null, 2))
            console.log("\nAll IDs and types:")
            json.data.products.forEach((p, i) => {
              console.log(`  [${i}] id=${p.id} (${typeof p.id}), title="${p.title}", visible=${p.visible}, agotado=${p.agotado}`)
            })
          }
        }
      }
    }
  } catch (parseErr) {
    console.log("JSON PARSE ERROR:", parseErr.message)
  }
} catch (fetchErr) {
  console.log("FETCH ERROR:", fetchErr.message)
}
