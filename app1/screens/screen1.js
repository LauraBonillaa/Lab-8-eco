import { makeRequest } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>Lab 1 - Consultas</h2>
        <button id="btn-all-products">1. Todos los productos</button>
        <button id="btn-products-price">2. Productos con precio &lt; 50</button>
        <button id="btn-users-fields">3. Solo username y email de usuarios</button>
        <button id="btn-orders-sorted">4. Órdenes por fecha descendente</button>
        <button id="btn-all-users">Ver todos los usuarios</button>
        <button id="change-screen-btn">Cambiar pantalla en app 2</button>
        <div id="results"></div>
      </div>
      `;

  document.getElementById("btn-all-products").addEventListener("click", getAllProducts);
  document.getElementById("btn-products-price").addEventListener("click", getProductsPrice);
  document.getElementById("btn-users-fields").addEventListener("click", getUsersFields);
  document.getElementById("btn-orders-sorted").addEventListener("click", getOrdersSorted);
  document.getElementById("btn-all-users").addEventListener("click", getAllUsers);
  document.getElementById("change-screen-btn").addEventListener("click", sendEventChangeScreen);

  async function getAllProducts() {
    const response = await makeRequest("/products", "GET");
    renderTable(response, ["id", "name", "price", "category"]);
  }

  async function getProductsPrice() {
    const response = await makeRequest("/products", "GET");
    const filtered = Array.isArray(response) ? response.filter(p => p.price < 50) : [];
    renderTable(filtered, ["id", "name", "price", "category"]);
  }

  async function getUsersFields() {
    const response = await makeRequest("/users", "GET");
    renderTable(response, ["username", "email"]);
  }

  async function getOrdersSorted() {
    const response = await makeRequest("/orders", "GET");
    const sorted = Array.isArray(response) ? response.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];
    renderTable(sorted, ["id", "user_id", "total", "created_at"]);
  }

  async function getAllUsers() {
    const response = await makeRequest("/users", "GET");
    renderTable(response, ["id", "username", "email", "created_at"]);
  }

  async function sendEventChangeScreen() {
    const changeEventResponse = await makeRequest("/change-screen", "POST");
    console.log("changeEventResponse", changeEventResponse);
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
}
