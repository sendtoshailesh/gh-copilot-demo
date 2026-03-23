import { reactive, computed } from 'vue'
import type { Album } from '../types/album'
import type { CartItem } from '../types/cart'

const cartItems = reactive<CartItem[]>([])

export function useCart() {
  const cartItemCount = computed(() =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cartItems.reduce((sum, item) => sum + item.album.price * item.quantity, 0)
  )

  function addToCart(album: Album) {
    const existing = cartItems.find((item) => item.album.id === album.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.push({ album, quantity: 1 })
    }
  }

  function removeFromCart(albumId: number) {
    const index = cartItems.findIndex((item) => item.album.id === albumId)
    if (index !== -1) {
      cartItems.splice(index, 1)
    }
  }

  return {
    cartItems,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
  }
}
