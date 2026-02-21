export function isOutOfStock(product: { stock: number }) {
  return !product.stock || product.stock <= 0
}

export function getStockLabel(product: { stock: number }) {
  return isOutOfStock(product) ? "Agotado" : "En stock"
}

export function getStockColor(product: { stock: number }) {
  return isOutOfStock(product)
    ? "text-red-500"
    : "text-green-600"
}