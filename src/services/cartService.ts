import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from "../utils/constants";
import { Product } from "../data/mockData";
import { api, ApiResponse, simulateDelay, USE_MOCK } from "./api";

export interface CartItemType {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface CartState {
  items: CartItemType[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  discreetPackaging: boolean;
}

const STORAGE_KEY_CART = "femora_cart";

function calculateCartTotals(items: CartItemType[], discreetPackaging = true): CartState {
  const subtotal = items.reduce((sum, item) => {
    let itemPrice = item.product.price;
    if (item.selectedVariant && item.product.variants) {
      const v = item.product.variants.find((vr) => vr.name === item.selectedVariant);
      if (v?.priceModifier) {
        itemPrice += v.priceModifier;
      }
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + deliveryFee;

  return {
    items,
    subtotal,
    deliveryFee,
    total,
    discreetPackaging,
  };
}

function getStoredCart(): CartState {
  const raw = localStorage.getItem(STORAGE_KEY_CART);
  if (!raw) {
    return {
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      total: 0,
      discreetPackaging: true,
    };
  }
  try {
    const parsed = JSON.parse(raw);
    return calculateCartTotals(parsed.items || [], parsed.discreetPackaging ?? true);
  } catch {
    return {
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      total: 0,
      discreetPackaging: true,
    };
  }
}

function saveStoredCart(cart: CartState) {
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
}

export const cartService = {
  async getCart(): Promise<ApiResponse<CartState>> {
    if (USE_MOCK) {
      await simulateDelay(150);
      return {
        success: true,
        data: getStoredCart(),
        message: "Cart loaded",
      };
    }
    const res = await api.get<ApiResponse<CartState>>("/cart");
    return res.data;
  },

  async addItem(product: Product, quantity: number = 1, selectedVariant?: string): Promise<ApiResponse<CartState>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      const cart = getStoredCart();
      const existingIdx = cart.items.findIndex(
        (i) => i.product.id === product.id && i.selectedVariant === selectedVariant
      );

      const maxStock = product.stock || 99;

      if (existingIdx !== -1) {
        const newQty = Math.min(maxStock, cart.items[existingIdx].quantity + quantity);
        cart.items[existingIdx].quantity = newQty;
      } else {
        const addQty = Math.min(maxStock, Math.max(1, quantity));
        cart.items.push({
          product,
          quantity: addQty,
          selectedVariant: selectedVariant || product.variants?.[0]?.name,
        });
      }

      const updatedCart = calculateCartTotals(cart.items, cart.discreetPackaging);
      saveStoredCart(updatedCart);
      return {
        success: true,
        data: updatedCart,
        message: `${product.name} added to cart`,
      };
    }

    const res = await api.post<ApiResponse<CartState>>("/cart/items", {
      productId: product.id,
      quantity,
      selectedVariant,
    });
    return res.data;
  },

  async updateItem(productId: string, quantity: number, selectedVariant?: string): Promise<ApiResponse<CartState>> {
    if (USE_MOCK) {
      await simulateDelay(150);
      const cart = getStoredCart();
      const existingIdx = cart.items.findIndex(
        (i) => i.product.id === productId && (!selectedVariant || i.selectedVariant === selectedVariant)
      );

      if (existingIdx !== -1) {
        if (quantity <= 0) {
          cart.items.splice(existingIdx, 1);
        } else {
          const maxStock = cart.items[existingIdx].product.stock || 99;
          cart.items[existingIdx].quantity = Math.min(maxStock, quantity);
        }
      }

      const updatedCart = calculateCartTotals(cart.items, cart.discreetPackaging);
      saveStoredCart(updatedCart);
      return {
        success: true,
        data: updatedCart,
        message: "Cart updated",
      };
    }

    const res = await api.put<ApiResponse<CartState>>(`/cart/items/${productId}`, {
      quantity,
      selectedVariant,
    });
    return res.data;
  },

  async removeItem(productId: string, selectedVariant?: string): Promise<ApiResponse<CartState>> {
    if (USE_MOCK) {
      await simulateDelay(150);
      const cart = getStoredCart();
      const filtered = cart.items.filter(
        (i) => !(i.product.id === productId && (!selectedVariant || i.selectedVariant === selectedVariant))
      );
      const updatedCart = calculateCartTotals(filtered, cart.discreetPackaging);
      saveStoredCart(updatedCart);
      return {
        success: true,
        data: updatedCart,
        message: "Item removed from cart",
      };
    }

    const res = await api.delete<ApiResponse<CartState>>(`/cart/items/${productId}`, {
      data: { selectedVariant },
    });
    return res.data;
  },

  async setDiscreetPackaging(enabled: boolean): Promise<ApiResponse<CartState>> {
    if (USE_MOCK) {
      const cart = getStoredCart();
      cart.discreetPackaging = enabled;
      saveStoredCart(cart);
      return {
        success: true,
        data: cart,
        message: `Discreet packaging ${enabled ? "enabled" : "disabled"}`,
      };
    }

    const res = await api.patch<ApiResponse<CartState>>("/cart/packaging", { enabled });
    return res.data;
  },

  async clearCart(): Promise<ApiResponse<CartState>> {
    if (USE_MOCK) {
      const emptyCart: CartState = {
        items: [],
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
        discreetPackaging: true,
      };
      saveStoredCart(emptyCart);
      return {
        success: true,
        data: emptyCart,
        message: "Cart cleared",
      };
    }

    const res = await api.delete<ApiResponse<CartState>>("/cart");
    return res.data;
  },
};
