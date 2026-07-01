export function renderNotFound({ outlet }) {
  document.title = "Page not found — KEYSTROKE";
  outlet.innerHTML = `
    <div class="wrap section">
      <div class="empty-state">
        <h2>404 — off the grid</h2>
        <p>Nothing's mapped to this path.</p>
        <p><a class="btn btn-primary" href="/">Back to home</a></p>
      </div>
    </div>
  `;
}
