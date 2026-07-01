import { initRouter, registerRoute, registerNotFound } from "./router.js";
import { renderHome } from "./pages/home.js";
import { renderCatalog } from "./pages/catalog.js";
import { renderProductDetail } from "./pages/productDetail.js";
import { renderCart } from "./pages/cart.js";
import { renderNotFound } from "./pages/notFound.js";
import { mountHeader } from "./components/header.js";
import { addToCart } from "./cart.js";
import { getProductBySku } from "./data.js";
import { showToast } from "./components/toast.js";

// Routes — order matters only where patterns could overlap.
registerRoute("/", renderHome);
registerRoute("/catalog", renderCatalog);
registerRoute("/catalog/:category", renderCatalog);
registerRoute("/product/:sku", renderProductDetail);
registerRoute("/cart", renderCart);
registerNotFound(renderNotFound);

// Global delegated handler for any "Add to cart" button rendered inside
// product grids (home, catalog) — the detail page handles its own button.
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add-sku]");
  if (!btn) return;
  const product = getProductBySku(btn.dataset.addSku);
  if (!product) return;
  addToCart(product.sku, 1);
  showToast(`Added ${product.name} to cart`);
});

document.addEventListener("DOMContentLoaded", () => {
  mountHeader();
  const outlet = document.getElementById("app");
  initRouter(outlet);

  // Register the service worker for offline-friendly asset caching.
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* non-fatal: app works fully without the service worker */
    });
  }
});
