// Generates lightweight, inline blueprint-style SVG illustrations per product.
// Using vector art generated at runtime (instead of shipping PNG/JPG assets)
// removes all image weight from the network tab entirely — this is the
// project's asset-optimization strategy: zero bytes beats a compressed byte.

function boardArt(color) {
  return `
    <rect x="12" y="28" width="176" height="64" rx="6" fill="none" stroke="${color}" stroke-width="2"/>
    ${Array.from({ length: 6 })
      .map((_, row) =>
        Array.from({ length: 14 })
          .map((_, col) => {
            const x = 20 + col * 12;
            const y = 36 + row * 9;
            if (x > 178 || y > 84) return "";
            return `<rect x="${x}" y="${y}" width="9" height="6" rx="1" fill="${color}" opacity="0.15"/>`;
          })
          .join("")
      )
      .join("")}
    <circle cx="20" cy="20" r="2" fill="${color}"/>
    <circle cx="180" cy="20" r="2" fill="${color}"/>
  `;
}

function switchArt(color) {
  return `
    <rect x="70" y="30" width="60" height="60" rx="4" fill="none" stroke="${color}" stroke-width="2"/>
    <rect x="85" y="15" width="30" height="20" rx="2" fill="none" stroke="${color}" stroke-width="2"/>
    <line x1="70" y1="60" x2="55" y2="60" stroke="${color}" stroke-width="1.5"/>
    <line x1="130" y1="60" x2="145" y2="60" stroke="${color}" stroke-width="1.5"/>
    <circle cx="100" cy="60" r="8" fill="${color}" opacity="0.2"/>
    <line x1="100" y1="90" x2="100" y2="104" stroke="${color}" stroke-width="1.5"/>
    <line x1="92" y1="104" x2="108" y2="104" stroke="${color}" stroke-width="1.5"/>
  `;
}

function keycapArt(color) {
  return `
    <path d="M60 40 L140 40 L150 90 L50 90 Z" fill="none" stroke="${color}" stroke-width="2"/>
    <path d="M68 46 L132 46 L139 84 L61 84 Z" fill="${color}" opacity="0.12"/>
    <line x1="90" y1="60" x2="110" y2="60" stroke="${color}" stroke-width="1.5"/>
    <line x1="86" y1="68" x2="114" y2="68" stroke="${color}" stroke-width="1.5"/>
  `;
}

function accessoryArt(color) {
  return `
    <rect x="30" y="45" width="140" height="30" rx="3" fill="none" stroke="${color}" stroke-width="2"/>
    ${Array.from({ length: 8 })
      .map(
        (_, i) =>
          `<line x1="${40 + i * 16}" y1="45" x2="${40 + i * 16}" y2="75" stroke="${color}" stroke-width="0.75" opacity="0.3"/>`
      )
      .join("")}
    <circle cx="100" cy="60" r="5" fill="${color}" opacity="0.25"/>
  `;
}

const ART_BY_CATEGORY = {
  boards: boardArt,
  switches: switchArt,
  keycaps: keycapArt,
  accessories: accessoryArt,
};

export function productArtSVG(product) {
  const artFn = ART_BY_CATEGORY[product.category] || boardArt;
  return `
    <svg viewBox="0 0 200 110" role="img" aria-label="${product.name} technical illustration" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="110" fill="none"/>
      ${Array.from({ length: 10 })
        .map((_, i) => `<line x1="${i * 20}" y1="0" x2="${i * 20}" y2="110" stroke="${product.color}" stroke-width="0.3" opacity="0.15"/>`)
        .join("")}
      ${Array.from({ length: 6 })
        .map((_, i) => `<line x1="0" y1="${i * 20}" x2="200" y2="${i * 20}" stroke="${product.color}" stroke-width="0.3" opacity="0.15"/>`)
        .join("")}
      ${artFn(product.color)}
    </svg>
  `;
}
