// src/api.js
const BASE = "http://localhost:5000";

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`);
  return res.json();
}

export async function addProduct(data) {
  const res = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
  return res.json();
}
