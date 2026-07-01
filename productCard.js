import { productArtSVG } from "../productArt.js";

export function productCardHTML(product) {
  return `
    <article class="product-card">
      <a href="/product/${product.sku}" aria-label="View ${product.name}">
        <div class="card-media">
          <span class="card-sku">${product.sku}</span>
          ${productArtSVG(product)}
        </div>
      </a>
      <div class="card-body">
        <a href="/product/${product.sku}"><h3>${product.name}</h3></a>
        <p class="card-blurb">${product.blurb}</p>
        <div class="card-meta">
          <span class="price">$${product.price}</span>
          <button class="card-cta" data-add-sku="${product.sku}">Add to cart</button>
        </div>
      </div>
    </article>
  `;
}

export function productGridHTML(products) {
  if (!products.length) {
    return `<div class="empty-state"><h2>No matches in this category</h2><p>Try a different filter.</p></div>`;
  }
  return `<div class="product-grid">${products.map(productCardHTML).join("")}</div>`;
}
