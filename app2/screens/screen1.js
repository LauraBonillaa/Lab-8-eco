import { makeRequest } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>Lab 2 - Consultas</h2>
        <button id="btn-users">1. Lista de Usuarios</button>
        <button id="btn-orders">2. Lista de Órdenes</button>
        <button id="btn-orders-sorted">3. Órdenes ordenadas por fecha</button>
        <button id="btn-products-category">4. Productos por categoría</button>
        <button id="btn-products-multi">5. Productos >30 y Electronics</button>
        <button id="btn-posts-like">6. Posts con 'tutorial' en título</button>
        <button id="btn-products-page">7. Primeros 10 productos</button>
        <button id="btn-products-user">8. Productos del usuario actual</button>
        <div id="results"></div>
      </div>
      `;

  document.getElementById("btn-users").addEventListener("click", getUsers);
  document.getElementById("btn-orders").addEventListener("click", getOrders);
  document.getElementById("btn-orders-sorted").addEventListener("click", getOrdersSorted);
  document.getElementById("btn-products-category").addEventListener("click", getProductsByCategory);
  document.getElementById("btn-products-multi").addEventListener("click", getProductsMulti);
  document.getElementById("btn-posts-like").addEventListener("click", getPostsLike);
  document.getElementById("btn-products-page").addEventListener("click", getProductsPage);
  document.getElementById("btn-products-user").addEventListener("click", getProductsUser);

  async function getUsers() {
    const response = await makeRequest("/users", "GET");
    renderTable(response, ["id", "name"]);
  }

  async function getOrders() {
    const response = await makeRequest("/orders", "GET");
    renderTable(response, ["id", "user_id", "total", "created_at"]);
  }

  async function getOrdersSorted() {
    const response = await makeRequest("/orders", "GET");
    let sorted = [];
    
    if (Array.isArray(response)) {
      sorted = response.sort(function(a, b) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
    }
    
    renderTable(sorted, ["id", "user_id", "total", "created_at"]);
  }

  async function getProductsByCategory() {
    const response = await makeRequest("/products", "GET");
    const resultsDiv = document.getElementById("results");
    
    if (!Array.isArray(response) || response.length === 0) {
      resultsDiv.innerHTML = "<p>No hay productos disponibles.</p>";
      return;
    }

    let productsByCategory = {};
    
    for (let i = 0; i < response.length; i++) {
      const product = response[i];
      const category = product.category;
      
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }
      
      productsByCategory[category].push(product);
    }

    let html = "<h3>Productos por Categoría</h3>";
    
    for (let category in productsByCategory) {
      html += `<h4>${category}</h4>`;
      html += "<table>";
      html += "<thead><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr></thead>";
      html += "<tbody>";
      
      const products = productsByCategory[category];
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        html += `<tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
        </tr>`;
      }
      
      html += "</tbody></table>";
    }
    
    resultsDiv.innerHTML = html;
  }

  async function getProductsMulti() {
    const response = await makeRequest("/products", "GET");
    let filtered = [];
    
    if (Array.isArray(response)) {
      for (let i = 0; i < response.length; i++) {
        const product = response[i];
        if (product.price > 30 && product.category === "Electronics") {
          filtered.push(product);
        }
      }
    }
    
    renderTable(filtered, ["id", "name", "price", "category"]);
  }

  async function getPostsLike() {
    const response = await makeRequest("/posts", "GET");
    let filtered = [];
    
    if (Array.isArray(response)) {
      for (let i = 0; i < response.length; i++) {
        const post = response[i];
        if (post.title && post.title.toLowerCase().indexOf("tutorial") !== -1) {
          filtered.push(post);
        }
      }
    }
    
    renderTable(filtered, ["id", "title", "content", "created_at"]);
  }

  async function getProductsPage() {
    const response = await makeRequest("/products", "GET");
    let paged = [];
    
    if (Array.isArray(response)) {
      for (let i = 0; i < response.length && i < 10; i++) {
        paged.push(response[i]);
      }
    }
    
    renderTable(paged, ["id", "name", "price", "category"]);
  }

  async function getProductsUser() {
    const response = await makeRequest("/products", "GET");
    let filtered = [];
    
    if (Array.isArray(response)) {
      for (let i = 0; i < response.length; i++) {
        const product = response[i];
        if (product.user_id === 1) {
          filtered.push(product);
        }
      }
    }
    
    renderTable(filtered, ["id", "name", "price", "category", "user_id"]);
  }

  function renderTable(data, columns) {
    const resultsDiv = document.getElementById("results");
    
    if (!Array.isArray(data) || data.length === 0) {
      resultsDiv.innerHTML = "<p>No hay datos para mostrar.</p>";
      return;
    }

    let table = "<table>";
    table += "<thead><tr>";
    for (let i = 0; i < columns.length; i++) {
      table += `<th>${columns[i]}</th>`;
    }
    table += "</tr></thead>";
    
    table += "<tbody>";
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      table += "<tr>";
      
      for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        const value = row[column] !== undefined ? row[column] : "";
        table += `<td>${value}</td>`;
      }
      
      table += "</tr>";
    }
    table += "</tbody></table>";
    
    resultsDiv.innerHTML = table;
  }
}
