// src/components/ProductForm.js
import React, { useEffect, useState } from "react";
import { addProduct, fetchProducts, updateProduct } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm({ editMode }) {
  const [form, setForm] = useState({
    name: "", description: "", category: "", price: 0, quantity: 0
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      fetchProducts().then(list => {
        const p = list.find(x => String(x.id) === String(id));
        if (p) setForm(p);
      });
    }
  }, [editMode, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name) return alert("Name required");
    if (editMode) {
      await updateProduct(form.id, form);
      navigate("/products");
    } else {
      await addProduct(form);
      navigate("/products");
    }
  }

  return (
    <div>
      <h3>{editMode ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit} className="form">
        <label>Name
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </label>

        <label>Description
          <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </label>

        <label>Category
          <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        </label>

        <label>Price
          <input type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
        </label>

        <label>Quantity
          <input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: Number(e.target.value)})} />
        </label>

        <div>
          <button type="submit">{editMode ? "Save Changes" : "Add Product"}</button>
          <button type="button" onClick={() => navigate("/products")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
