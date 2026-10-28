import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster  position="top-right" toastOptions={{  duration: 3500,  style: {  background: "#2B1215",  color: "#FFFFFF",
                  fontSize: "13px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -3px rgba(128, 0, 0, 0.2)",
                  padding: "12px 16px",
                },
                success: {
                  iconTheme: {
                    primary: "#1BA896",
                    secondary: "#FFFFFF",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#E63B6E",
                    secondary: "#FFFFFF",
                  },
                },
              }}
            />
            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
