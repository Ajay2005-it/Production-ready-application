import { getProductBySku } from "../data.js";
import { productArtSVG } from "../productArt.js";
import { addToCart } from "../cart.js";
import { showToast } from "../components/toast.js";

export function renderProductDetail({ params, outlet }) {
  const product = getProductBySku(params.sku);

  if (!product) {
    outlet.innerHTML = `
      <div class="wrap section">
        <div class="empty-state">
          <h2>That SKU doesn't exist</h2>
          <p><a class="btn btn-ghost" href="/catalog">Back to catalog</a></p>
        </div>
      </div>
    `;
    return;
  }

  document.title = `${product.name} — KEYSTROKE`;
  let qty = 1;

  outlet.innerHTML = `
    <div class="wrap section">
      <p class="breadcrumb">
        <a href="/catalog">Catalog</a> /
        <a href="/catalog/${product.category}">${product.category}</a> /
        ${product.sku}
      </p>
      <div class="detail-grid">
        <div class="detail-media">${productArtSVG(product)}</div>
        <div class="detail-info">
          <span class="card-sku">${product.sku}</span>
          <h1>${product.name}</h1>
          <span class="price">$${product.price}</span>
          <p class="card-blurb">${product.blurb}</p>

          <table class="spec-table">
            <tr><td>Layout</td><td>${product.layout}</td></tr>
            <tr><td>Mount / prep</td><td>${product.mount}</td></tr>
            <tr><td>Weight / spec</td><td>${product.weight}</td></tr>
            ${product.specs.map((s) => `<tr><td>Detail</td><td>${s}</td></tr>`).join("")}
          </table>

          <div class="qty-row">
            <div class="qty-control">
              <button type="button" data-qty="dec" aria-label="Decrease quantity">−</button>
              <span data-qty-value>1</span>
              <button type="button" data-qty="inc" aria-label="Increase quantity">+</button>
            </div>
            <span class="stock-note">${product.stock} in stock</span>
          </div>

          <button class="btn btn-primary" data-add-to-cart>Add to cart — $${product.price}</button>
        </div>
      </div>
    </div>
  `;

  const qtyValueEl = outlet.querySelector("[data-qty-value]");
  outlet.querySelector('[data-qty="inc"]').addEventListener("click", () => {
    qty = Math.min(qty + 1, product.stock);
    qtyValueEl.textContent = String(qty);
  });
  outlet.querySelector('[data-qty="dec"]').addEventListener("click", () => {
    qty = Math.max(qty - 1, 1);
    qtyValueEl.textContent = String(qty);
  });
  outlet.querySelector("[data-add-to-cart]").addEventListener("click", () => {
    addToCart(product.sku, qty);
    showToast(`Added ${qty} × ${product.name} to cart`);
  });
}

