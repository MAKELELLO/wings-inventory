import React, { useState } from "react";

function TransactionModal({ isOpen, onClose, onSave, product }) {
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("add"); // add or deduct

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quantity || isNaN(quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    onSave({
      productId: product.id,
      type,
      quantity: parseInt(quantity, 10),
    });

    setQuantity("");
    setType("add");
    onClose();
  };

  return (
    <div className="modal">
      <h3>Stock Transaction for {product.name}</h3>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Transaction Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="add">Add Stock</option>
            <option value="deduct">Deduct Stock</option>
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </label>
        <button type="submit">Save Transaction</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TransactionModal;
