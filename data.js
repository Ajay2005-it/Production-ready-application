// Product catalog data for KEYSTROKE — a mechanical keyboard supply shop.
// In a real deployment this would be fetched from an API; it's inlined
// here as a static module so the catalog works with zero backend.

export const CATEGORIES = [
  { id: "boards", label: "Keyboards" },
  { id: "switches", label: "Switches" },
  { id: "keycaps", label: "Keycaps" },
  { id: "accessories", label: "Accessories" },
];

export const PRODUCTS = [
  {
    sku: "KS-BRD-75L",
    name: "Traverse 75L",
    category: "boards",
    price: 189,
    layout: "75%",
    mount: "Gasket mount",
    weight: "1.05 kg",
    blurb: "A 75% layout with a stainless steel weight and a south-facing PCB, tuned for a deep, rounded sound profile.",
    specs: ["Aluminum CNC case", "Hot-swap PCB", "5-pin south-facing", "USB-C, 1.5m coiled cable"],
    stock: 14,
    color: "#4FD1E8",
  },
  {
    sku: "KS-BRD-6XN",
    name: "Sixty-Six Nano",
    category: "boards",
    price: 149,
    layout: "60%",
    mount: "Top mount",
    weight: "0.78 kg",
    blurb: "Compact 60% board built for travel — polycarbonate case, screw-in stabilizers, no compromises on rigidity.",
    specs: ["Polycarbonate case", "Hot-swap PCB", "Screw-in stabilizers", "USB-C detachable cable"],
    stock: 22,
    color: "#E8A23D",
  },
  {
    sku: "KS-BRD-TKL9",
    name: "Field TKL-9",
    category: "boards",
    price: 215,
    layout: "TKL",
    mount: "Leaf-spring",
    weight: "1.3 kg",
    blurb: "Tenkeyless flagship with a leaf-spring plate for a bouncy, cushioned keystroke and near-silent bottom-out.",
    specs: ["Aluminum + brass weight", "Leaf-spring plate", "Hot-swap PCB", "Silicone dampening layer"],
    stock: 8,
    color: "#8AD1FF",
  },
  {
    sku: "KS-SW-LNR45",
    name: "Linear 45 — Switch Set (35pcs)",
    category: "switches",
    price: 24,
    layout: "Linear",
    mount: "5-pin",
    weight: "45 g actuation",
    blurb: "Factory-lubed linear switches with a long-pole stem for reduced wobble and a smooth, consistent travel.",
    specs: ["45g actuation force", "2.0mm pre-travel", "Factory lubed", "5-pin, hot-swap compatible"],
    stock: 60,
    color: "#E8A23D",
  },
  {
    sku: "KS-SW-TAC62",
    name: "Tactile 62 — Switch Set (35pcs)",
    category: "switches",
    price: 26,
    layout: "Tactile",
    mount: "5-pin",
    weight: "62 g actuation",
    blurb: "A pronounced tactile bump positioned early in the stroke, built for typists who want clear feedback.",
    specs: ["62g actuation force", "Tactile bump at 1.2mm", "POM stem", "5-pin, hot-swap compatible"],
    stock: 47,
    color: "#4FD1E8",
  },
  {
    sku: "KS-KC-BLPR",
    name: "Blueprint Keycap Set",
    category: "keycaps",
    price: 89,
    layout: "Cherry profile",
    mount: "PBT dye-sub",
    weight: "104 keys",
    blurb: "Dye-sublimated PBT caps in a drafting-table colorway — ruled legends, technical iconography, zero shine.",
    specs: ["PBT, dye-sublimated", "Cherry profile", "104-key + novelties", "1.5mm wall thickness"],
    stock: 31,
    color: "#4FD1E8",
  },
  {
    sku: "KS-KC-SLSD",
    name: "Slate & Sand Keycap Set",
    category: "keycaps",
    price: 79,
    layout: "OEM profile",
    mount: "ABS double-shot",
    weight: "108 keys",
    blurb: "A quiet two-tone set — warm sand alphas against slate modifiers, double-shot for legends that never fade.",
    specs: ["ABS, double-shot", "OEM profile", "108-key + novelties", "Compatible with most 5-pin boards"],
    stock: 19,
    color: "#E8A23D",
  },
  {
    sku: "KS-AC-DSKM",
    name: "Desk Mat — Grid 900",
    category: "accessories",
    price: 34,
    layout: "900 × 400mm",
    mount: "—",
    weight: "4mm thick",
    blurb: "Stitched-edge desk mat with a faint millimeter grid, printed for precision rather than decoration.",
    specs: ["900 × 400 × 4mm", "Stitched edges", "Non-slip rubber base", "Water-resistant surface"],
    stock: 40,
    color: "#8AD1FF",
  },
  {
    sku: "KS-AC-LUBK",
    name: "Lube Station Kit",
    category: "accessories",
    price: 42,
    layout: "Switch prep",
    mount: "—",
    weight: "6-piece kit",
    blurb: "Everything to hand-lube a switch set: brush, switch opener, spring tray, and two lube viscosities.",
    specs: ["205g0 + 105g0 lube", "Switch opener", "Fine-bristle brush", "35-switch tray"],
    stock: 26,
    color: "#E8A23D",
  },
];

export function getProductBySku(sku) {
  return PRODUCTS.find((p) => p.sku === sku) || null;
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === categoryId);
}
