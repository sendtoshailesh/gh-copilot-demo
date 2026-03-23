<template>
  <div class="cart-overlay" @click.self="$emit('close')">
    <div class="cart-panel">
      <div class="cart-header">
        <h2>🛒 Your Cart</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <div v-if="cartItems.length === 0" class="cart-empty">
        <p>Your cart is empty</p>
        <p class="cart-empty-hint">Browse albums and click "Add to Cart" to get started!</p>
      </div>

      <div v-else class="cart-content">
        <ul class="cart-items">
          <li v-for="item in cartItems" :key="item.album.id" class="cart-item">
            <img
              :src="item.album.image_url"
              :alt="item.album.title"
              class="cart-item-image"
            />
            <div class="cart-item-info">
              <span class="cart-item-title">{{ item.album.title }}</span>
              <span class="cart-item-artist">{{ item.album.artist }}</span>
              <span class="cart-item-price">${{ (item.album.price * item.quantity).toFixed(2) }}</span>
              <span v-if="item.quantity > 1" class="cart-item-qty">Qty: {{ item.quantity }}</span>
            </div>
            <button class="remove-btn" @click="removeFromCart(item.album.id)">Remove</button>
          </li>
        </ul>

        <div class="cart-footer">
          <div class="cart-total">
            <span>Total</span>
            <span class="cart-total-price">${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

defineEmits<{ close: [] }>()

const { cartItems, cartTotal, removeFromCart } = useCart()
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.cart-panel {
  width: 400px;
  max-width: 90vw;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  padding: 2rem;
}

.cart-empty p {
  font-size: 1.2rem;
  margin: 0;
}

.cart-empty-hint {
  font-size: 0.9rem !important;
  margin-top: 0.5rem !important;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-items {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.cart-item-title {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.cart-item-artist {
  color: #888;
  font-size: 0.85rem;
}

.cart-item-price {
  color: #667eea;
  font-weight: 600;
  font-size: 0.95rem;
}

.cart-item-qty {
  color: #999;
  font-size: 0.8rem;
}

.remove-btn {
  background: none;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #e74c3c;
  color: white;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 2px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.cart-total-price {
  color: #667eea;
  font-size: 1.4rem;
}
</style>
