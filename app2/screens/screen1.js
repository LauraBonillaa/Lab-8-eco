import { makeRequest } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>Lab 2 - Consultas</h2>
        <button id="btn-products-category">1. Productos por categoría</button>
        <button id="btn-products-multi">2. Productos >30 y Electronics</button>
        <button id="btn-posts-like">3. Posts con 'tutorial' en título</button>
        <button id="btn-products-page">4. Primeros 10 productos</button>
        <button id="btn-products-user">5. Productos del usuario actual</button>
        <div id="results"></div>
      </div>
      `;

  document.getElementById("btn-products-category").addEventListener("click", getProductsByCategory);
  document.getElementById("btn-products-multi").addEventListener("click", getProductsMulti);
  document.getElementById("btn-posts-like").addEventListener("click", getPostsLike);
  document.getElementById("btn-products-page").addEventListener("click", getProductsPage);
  document.getElementById("btn-products-user").addEventListener("click", getProductsUser);

  async function getProductsByCategory() {
    const productos = await makeRequest("/products", "GET");
    const resultsDiv = document.getElementById("results");
    
    if (!Array.isArray(productos) || productos.length === 0) {
      resultsDiv.innerHTML = "<p>No hay productos disponibles.</p>";
      return;
    }

    let html = "<h3>Lista de Productos</h3>";
    html += "<ul>";
    
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      html += `<li>
        <strong>${producto.name}</strong> - 
        Categoría: ${producto.category} - 
        Precio: $${producto.price}
      </li>`;
    }
    
    html += "</ul>";
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

    let html = "<ul>";
    
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      html += "<li>";
      
      for (let j = 0; j < columns.length; j++) {
        const columna = columns[j];
        const valor = item[columna] !== undefined ? item[columna] : "";
        html += `<strong>${columna}:</strong> ${valor} `;
      }
      
      html += "</li>";
    }
    
    html += "</ul>";
    resultsDiv.innerHTML = html;
  }
}
