import { PRODUCTS } from "../data.js";
import { productGridHTML } from "../components/productCard.js";

export function renderHome({ outlet }) {
  const featured = PRODUCTS.slice(0, 3);
  document.title = "KEYSTROKE — Precision keyboard supply";

  outlet.innerHTML = `
    <section class="hero blueprint-bg">
      <div class="wrap">
        <p class="eyebrow">Spec sheet 001 / Precision input hardware</p>
        <h1>Keyboards built like they'll be inspected, not just used.</h1>
        <p class="lede">
          Hot-swap boards, factory-lubed switches, and dye-sublimated keycaps —
          catalogued with the same rigor as the parts themselves.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/catalog">Browse catalog</a>
          <a class="btn btn-ghost" href="/catalog/boards">Shop keyboards</a>
        </div>
        <div class="hero-stats">
          <div>
            <div class="stat-value">${PRODUCTS.length}</div>
            <div class="stat-label">SKUs in stock</div>
          </div>
          <div>
            <div class="stat-value">4</div>
            <div class="stat-label">Categories</div>
          </div>
          <div>
            <div class="stat-value">2–4d</div>
            <div class="stat-label">Ship window</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <h2>Featured this cycle</h2>
          <a class="tag" href="/catalog">View full catalog →</a>
        </div>
        ${productGridHTML(featured)}
      </div>
    </section>
  `;
}
