import { navigateTo, socket, makeRequest } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>Lab 2 - Consultas avanzadas</h2>
        <button id="btn-products-multi">6. Productos >30 y Electronics</button>
        <button id="btn-posts-like">7. Posts con 'tutorial' en título</button>
        <button id="btn-products-page">8. Primeros 10 productos</button>
        <button id="btn-products-user">9. Productos del usuario actual</button>
        <div id="results"></div>
      </div>
      `;

  document.getElementById("btn-products-multi").addEventListener("click", getProductsMulti);
  document.getElementById("btn-posts-like").addEventListener("click", getPostsLike);
  document.getElementById("btn-products-page").addEventListener("click", getProductsPage);
  document.getElementById("btn-products-user").addEventListener("click", getProductsUser);

  async function getProductsMulti() {
    const response = await makeRequest("/products", "GET");
    const filtered = Array.isArray(response)
      ? response.filter(p => p.price > 30 && p.category === "Electronics")
      : [];
    renderTable(filtered, ["id", "name", "price", "category"]);
  }

  async function getPostsLike() {
    const response = await makeRequest("/posts", "GET");
    const filtered = Array.isArray(response)
      ? response.filter(p => p.title && p.title.toLowerCase().includes("tutorial"))
      : [];
    renderTable(filtered, ["id", "title", "content", "created_at"]);
  }

  async function getProductsPage() {
    const response = await makeRequest("/products", "GET");
    const paged = Array.isArray(response) ? response.slice(0, 10) : [];
    renderTable(paged, ["id", "name", "price", "category"]);
  }

  async function getProductsUser() {
    // Simulando usuario actual con user_id = 1
    const response = await makeRequest("/products", "GET");
    const filtered = Array.isArray(response)
      ? response.filter(p => p.user_id === 1)
      : [];
    renderTable(filtered, ["id", "name", "price", "category", "user_id"]);
  }

  function renderTable(data, columns) {
    const resultsDiv = document.getElementById("results");
    if (!Array.isArray(data) || data.length === 0) {
      resultsDiv.innerHTML = "<p>No hay datos para mostrar.</p>";
      return;
    }
    let table = `<table><thead><tr>${columns
      .map((col) => `<th>${col}</th>`)
      .join("")}</tr></thead><tbody>`;
    data.forEach((row) => {
      table += `<tr>${columns
        .map((col) => `<td>${row[col] !== undefined ? row[col] : ""}</td>`)
        .join("")}</tr>`;
    });
    table += "</tbody></table>";
    resultsDiv.innerHTML = table;
  }

  socket.on("next-screen", (data) => {
    navigateTo("/screen2", { name: "Hola" });
  });
}
