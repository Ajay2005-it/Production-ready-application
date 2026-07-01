import { CATEGORIES, getProductsByCategory } from "../data.js";
import { productGridHTML } from "../components/productCard.js";
import { navigate } from "../router.js";

export function renderCatalog({ params, outlet }) {
  const activeCategory = params.category || "all";
  document.title = "Catalog — KEYSTROKE";

  const chips = [{ id: "all", label: "All" }, ...CATEGORIES];

  outlet.innerHTML = `
    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <h2>Full catalog</h2>
          <span class="tag">${getProductsByCategory(activeCategory).length} items</span>
        </div>
        <div class="filter-row" role="group" aria-label="Filter by category">
          ${chips
            .map(
              (c) => `
              <button class="filter-chip" data-category="${c.id}" aria-pressed="${c.id === activeCategory}">
                ${c.label}
              </button>`
            )
            .join("")}
        </div>
        <div id="catalog-grid">${productGridHTML(getProductsByCategory(activeCategory))}</div>
      </div>
    </section>
  `;

  outlet.querySelectorAll("[data-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.category;
      navigate(id === "all" ? "/catalog" : `/catalog/${id}`);
    });
  });
}
