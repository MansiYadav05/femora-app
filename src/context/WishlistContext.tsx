import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string, productName?: string) => void;
  count: number;
}

const STORAGE_KEY_WISHLIST = "femora_wishlist";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? JSON.parse(saved) : ["pad-101", "patch-401"];
    } catch {
      return ["pad-101", "patch-401"];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = (productId: string, productName?: string) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      toast.success(productName ? `Removed ${productName} from wishlist` : "Removed from wishlist", {
        icon: "🤍",
        style: {
          borderRadius: "10px",
          background: "#2B1215",
          color: "#fff",
          fontSize: "13px",
        },
      });
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      toast.success(productName ? `Added ${productName} to wishlist` : "Added to wishlist", {
        icon: "💖",
        style: {
          borderRadius: "10px",
          background: "#2B1215",
          color: "#fff",
          fontSize: "13px",
        },
      });
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        count: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
