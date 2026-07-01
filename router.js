// Minimal client-side router built on the History API.
// Routes are matched against path patterns like "/product/:sku".
// Every internal <a href> is intercepted so navigation never triggers
// a full page reload — this is what makes it a single-page app.

const routes = [];
let notFoundHandler = null;
let outlet = null;

export function registerRoute(pattern, handler) {
  const paramNames = [];
  const regexStr = pattern
    .replace(/\/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return "/([^/]+)";
    })
    .replace(/\//g, "\\/");
  const regex = new RegExp(`^${regexStr}\\/?$`);
  routes.push({ regex, paramNames, handler });
}

export function registerNotFound(handler) {
  notFoundHandler = handler;
}

export function initRouter(outletEl) {
  outlet = outletEl;

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("//") || link.target === "_blank") return;
    if (!href.startsWith("/")) return;
    e.preventDefault();
    navigate(href);
  });

  window.addEventListener("popstate", () => render(location.pathname));

  render(location.pathname);
}

export function navigate(path, { replace = false } = {}) {
  if (replace) {
    history.replaceState({}, "", path);
  } else {
    history.pushState({}, "", path);
  }
  render(path);
}

async function render(path) {
  for (const route of routes) {
    const match = path.match(route.regex);
    if (match) {
      const params = {};
      route.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      await route.handler({ params, outlet });
      updateActiveNav(path);
      return;
    }
  }
  if (notFoundHandler) {
    await notFoundHandler({ params: {}, outlet });
  }
}

function updateActiveNav(path) {
  document.querySelectorAll(".main-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    const isMatch = href === path || (href !== "/" && path.startsWith(href));
    if (isMatch) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}
