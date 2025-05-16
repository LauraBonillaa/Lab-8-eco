import renderScreen1 from "./screens/screen1.js";

const socket = io("/", { path: "/real-time" });

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

let route = { path: "/", data: {} };
renderRoute(route);

function renderRoute(currentRoute) {
  clearScripts();
  renderScreen1(currentRoute.data);
}

function navigateTo(path, data) {
  route = { path, data };
  renderRoute(route);
}

async function makeRequest(url, method, body) {
  const BASE_URL = "http://localhost:5050";
  
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let response = await fetch(BASE_URL + url, options);
  response = await response.json();

  return response;
}

export { navigateTo, socket, makeRequest };
