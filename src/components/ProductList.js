import React, { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.name || !form.category || !form.quantity || !form.price) return;
    const newProduct = { ...form, id: Date.now() };
    setProducts((prev) => [...prev, newProduct]);
    setForm({ name: "", category: "", quantity: "", price: "", image: "" });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm(product);
  };

  const handleUpdate = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editingId ? { ...form, id: editingId } : p))
    );
    setEditingId(null);
    setForm({ name: "", category: "", quantity: "", price: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", category: "", quantity: "", price: "", image: "" });
    }
  };

  const styles = {
    container: { padding: "20px", fontFamily: "Arial, sans-serif" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: { borderBottom: "2px solid #ccc", padding: "10px", textAlign: "left" },
    td: { borderBottom: "1px solid #eee", padding: "10px" },
    input: { padding: "6px", borderRadius: "4px", border: "1px solid #ccc", width: "100%" },
    button: { padding: "6px 12px", marginRight: "5px", borderRadius: "4px", border: "none", cursor: "pointer" },
    addButton: { backgroundColor: "#28a745", color: "#fff" },
    updateButton: { backgroundColor: "#ffc107", color: "#000" },
    deleteButton: { backgroundColor: "#dc3545", color: "#fff" },
  };

  return (
    <div style={styles.container}>
      <h2>Product List</h2>

      {/* Inline Form */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" style={styles.input} />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" style={styles.input} />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" style={styles.input} />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" style={styles.input} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" style={styles.input} />
        {editingId ? (
          <button onClick={handleUpdate} style={{ ...styles.button, ...styles.updateButton }}>Update</button>
        ) : (
          <button onClick={handleAdd} style={{ ...styles.button, ...styles.addButton }}>Add</button>
        )}
      </div>

      {/* Product Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={styles.td}>
                <img src={p.image || "/images/default-product.jpg"} alt={p.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
              </td>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>{p.category}</td>
              <td style={styles.td}>{p.quantity}</td>
              <td style={styles.td}>💲{p.price}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(p)} style={{ ...styles.button, ...styles.updateButton }}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" style={styles.td}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
