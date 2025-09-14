// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <h2>Wings Cafe - Inventory</h2>
          <div>
            <Link to="/">Dashboard</Link>
            <Link to="/products">Products</Link>
            <Link to="/add">Add Product</Link>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm editMode />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

