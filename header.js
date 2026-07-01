import { cartCount, subscribe } from "../cart.js";

export function mountHeader() {
  const badge = document.querySelector("[data-cart-count]");
  if (!badge) return;
  const update = () => {
    const count = cartCount();
    badge.textContent = String(count);
    badge.style.display = count > 0 ? "inline-flex" : "none";
  };
  update();
  subscribe(update);
}
