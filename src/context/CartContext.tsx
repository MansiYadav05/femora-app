import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Product } from "../data/mockData";
import { CartItemType, CartState, cartService } from "../services/cartService";

interface CartContextType {
  items: CartItemType[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  discreetPackaging: boolean;
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number, variant?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, variant?: string) => Promise<void>;
  removeItem: (productId: string, variant?: string) => Promise<void>;
  toggleDiscreetPackaging: () => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
    discreetPackaging: true,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial cart
  useEffect(() => {
    cartService.getCart().then((res) => {
      if (res.success && res.data) {
        setCartState(res.data);
      }
      setIsLoading(false);
    });
  }, []);

  const itemCount = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = async (product: Product, quantity = 1, variant?: string) => {
    try {
      const res = await cartService.addItem(product, quantity, variant);
      if (res.success && res.data) {
        setCartState(res.data);
        toast.success(`Added ${product.name} to cart`, {
          icon: "🌸",
          style: {
            borderRadius: "10px",
            background: "#2B1215",
            color: "#fff",
            fontSize: "14px",
          },
        });
        setIsCartOpen(true);
      }
    } catch {
      toast.error("Failed to add product to cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number, variant?: string) => {
    try {
      const res = await cartService.updateItem(productId, quantity, variant);
      if (res.success && res.data) {
        setCartState(res.data);
      }
    } catch {
      toast.error("Could not update item quantity");
    }
  };

  const removeItem = async (productId: string, variant?: string) => {
    try {
      const res = await cartService.removeItem(productId, variant);
      if (res.success && res.data) {
        setCartState(res.data);
        toast.success("Item removed from cart");
      }
    } catch {
      toast.error("Could not remove item");
    }
  };

  const toggleDiscreetPackaging = async () => {
    const nextVal = !cartState.discreetPackaging;
    try {
      const res = await cartService.setDiscreetPackaging(nextVal);
      if (res.success && res.data) {
        setCartState(res.data);
      }
    } catch {
      toast.error("Could not update packaging preference");
    }
  };

  const clearCart = async () => {
    try {
      const res = await cartService.clearCart();
      if (res.success && res.data) {
        setCartState(res.data);
      }
    } catch {
      toast.error("Could not clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        itemCount,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        toggleDiscreetPackaging,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
