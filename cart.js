import { getCart, setQuantity, removeFromCart, clearCart } from "../cart.js";
import { getProductBySku } from "../data.js";

export function renderCart({ outlet }) {
  document.title = "Cart — KEYSTROKE";
  paint(outlet);
}

function paint(outlet) {
  const cart = getCart();
  const skus = Object.keys(cart);

  if (skus.length === 0) {
    outlet.innerHTML = `
      <div class="wrap section">
        <div class="empty-state">
          <h2>Your cart is empty</h2>
          <p>Nothing queued up yet.</p>
          <p><a class="btn btn-primary" href="/catalog">Browse the catalog</a></p>
        </div>
      </div>
    `;
    return;
  }

  const lines = skus
    .map((sku) => ({ product: getProductBySku(sku), qty: cart[sku] }))
    .filter((line) => line.product);

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  outlet.innerHTML = `
    <div class="wrap section">
      <div class="section-head"><h2>Your cart</h2><span class="tag">${lines.length} item${lines.length === 1 ? "" : "s"}</span></div>
      <table class="cart-table">
        <thead>
          <tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>
          ${lines
            .map(
              (l) => `
            <tr>
              <td>
                <a href="/product/${l.product.sku}" class="cart-row-name">${l.product.name}</a><br/>
                <span class="cart-row-sku">${l.product.sku}</span>
              </td>
              <td class="price">$${l.product.price}</td>
              <td>
                <div class="qty-control">
                  <button type="button" data-dec="${l.product.sku}" aria-label="Decrease quantity">−</button>
                  <span>${l.qty}</span>
                  <button type="button" data-inc="${l.product.sku}" aria-label="Increase quantity">+</button>
                </div>
              </td>
              <td class="price">$${(l.product.price * l.qty).toFixed(2)}</td>
              <td><button class="remove-btn" data-remove="${l.product.sku}">Remove</button></td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="cart-summary">
        <div class="row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="row"><span>Shipping</span><span>${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
        <div class="row total"><span>Total</span><span class="price">$${total.toFixed(2)}</span></div>
        <button class="btn btn-primary" style="width:100%; justify-content:center; margin-top:16px;" data-checkout>
          Checkout
        </button>
      </div>
    </div>
  `;

  outlet.querySelectorAll("[data-inc]").forEach((btn) =>
    btn.addEventListener("click", () => {
      setQuantity(btn.dataset.inc, cart[btn.dataset.inc] + 1);
      paint(outlet);
    })
  );
  outlet.querySelectorAll("[data-dec]").forEach((btn) =>
    btn.addEventListener("click", () => {
      setQuantity(btn.dataset.dec, cart[btn.dataset.dec] - 1);
      paint(outlet);
    })
  );
  outlet.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.remove);
      paint(outlet);
    })
  );
  const checkoutBtn = outlet.querySelector("[data-checkout]");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      clearCart();
      outlet.innerHTML = `
        <div class="wrap section">
          <div class="empty-state">
            <h2>Order placed</h2>
            <p>This is a demo checkout — no payment was charged. Your cart has been cleared.</p>
            <p><a class="btn btn-ghost" href="/catalog">Continue browsing</a></p>
          </div>
        </div>
      `;
    });
  }
}
