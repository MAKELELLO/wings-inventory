import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [inputs, setInputs] = useState({}); // Track quantity and payment per product
  const [messages, setMessages] = useState({});
  const [changes, setChanges] = useState({});

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const totalProducts = products.length;

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    const updatedInputs = { ...inputs };
    delete updatedInputs[id];
    setInputs(updatedInputs);
  };

  const handleInputChange = (id, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handlePurchase = (product) => {
    const { quantityWanted = 1, payment = "" } = inputs[product.id] || {};
    const totalCost = quantityWanted * parseFloat(product.price);
    const paid = parseFloat(payment);

    if (isNaN(paid)) {
      setMessages((prev) => ({ ...prev, [product.id]: "Please enter a valid amount." }));
      setChanges((prev) => ({ ...prev, [product.id]: null }));
    } else if (paid < totalCost) {
      setMessages((prev) => ({
        ...prev,
        [product.id]: `Insufficient funds. You need 💲${totalCost.toFixed(2)}.`,
      }));
      setChanges((prev) => ({ ...prev, [product.id]: null }));
    } else {
      setMessages((prev) => ({ ...prev, [product.id]: "Purchase successful!" }));
      setChanges((prev) => ({ ...prev, [product.id]: (paid - totalCost).toFixed(2) }));
    }
  };

  const styles = {
    dashboard: { padding: "20px", fontFamily: "Arial, sans-serif" },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "30px",
    },
    card: {
      width: "250px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      backgroundColor: "#fff",
    },
    cardImage: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
    },
    cardBody: {
      padding: "15px",
      textAlign: "center",
    },
    cardTitle: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    cardText: {
      fontSize: "0.9rem",
      color: "#555",
      marginBottom: "5px",
    },
    input: {
      padding: "6px",
      margin: "5px 0",
      width: "100%",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "8px",
      marginTop: "5px",
      width: "100%",
      backgroundColor: "pink",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    deleteButton: {
      marginTop: "10px",
      padding: "6px 12px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.dashboard}>
      <h2>Dashboard</h2>

      {/* Summary Card */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <img src="/images/default-product.jpg" alt="Summary" style={styles.cardImage} />
          <div style={styles.cardBody}>
            <div style={styles.cardTitle}>Total Products</div>
            <div style={styles.cardText}>{totalProducts}</div>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <h3>Available Products</h3>
      <div style={styles.cardContainer}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <div key={p.id} style={styles.card}>
              <img
                src={p.image || "/images/default-product.jpg"}
                alt={p.name}
                style={styles.cardImage}
              />
              <div style={styles.cardBody}>
                <h4 style={styles.cardTitle}>{p.name}</h4>
                <p style={styles.cardText}>{p.category} | Qty: {p.quantity}</p>
                <p style={styles.cardText}>R{p.price}</p>

                <input
                  type="number"
                  min="1"
                  value={inputs[p.id]?.quantityWanted || 1}
                  onChange={(e) => handleInputChange(p.id, "quantityWanted", e.target.value)}
                  placeholder="Quantity"
                  style={styles.input}
                />
                <input
                  type="number"
                  value={inputs[p.id]?.payment || ""}
                  onChange={(e) => handleInputChange(p.id, "payment", e.target.value)}
                  placeholder="Enter money"
                  style={styles.input}
                />
                <button onClick={() => handlePurchase(p)} style={styles.button}>
                  Buy
                </button>

                {messages[p.id] && <p style={styles.cardText}>{messages[p.id]}</p>}
                {changes[p.id] !== null && changes[p.id] !== undefined && (
                  <p style={styles.cardText}>Change: R{changes[p.id]}</p>
                )}

                <button style={styles.deleteButton} onClick={() => handleDeleteProduct(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
