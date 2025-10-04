import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { WishlistProvider } from "./Context/WishListContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <WishlistProvider>
            <CartProvider>
        <App />
        </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
