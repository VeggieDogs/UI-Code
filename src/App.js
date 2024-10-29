// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Search from './components/Search';
import ProductPage from './components/ProductPage';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Orders from './components/Orders';
import SellerOrders from './components/SellerOrders';
import PostProduct from './components/PostProduct';
import SellerDashboard from './components/SellerDashboard';
import PostOrder from './components/PostOrder';

const sampleBuyerOrders = [
  { id: 1, productName: 'Product 1', quantity: 2, totalPrice: 100, status: 'Shipped' },
  { id: 2, productName: 'Product 2', quantity: 1, totalPrice: 50, status: 'Processing' },
  { id: 3, productName: 'Product 3', quantity: 3, totalPrice: 150, status: 'Delivered' },
];

const sampleSellerOrders = [
  { id: 1, buyerName: 'Buyer 1', productName: 'Product 1', quantity: 2, totalPrice: 100, status: 'Shipped' },
  { id: 2, buyerName: 'Buyer 2', productName: 'Product 2', quantity: 1, totalPrice: 50, status: 'Processing' },
  { id: 3, buyerName: 'Buyer 3', productName: 'Product 3', quantity: 3, totalPrice: 150, status: 'Delivered' },
];

const products = [
  { id: 1, name: 'Product 1', description: 'Description for product 1', image: '/images/item1.jpg' },
  { id: 2, name: 'Product 2', description: 'Description for product 2', image: '/images/item2.jpg' },
  { id: 3, name: 'Product 3', description: 'Description for product 3', image: '/images/item3.jpg' },
  { id: 4, name: 'Product 4', description: 'Description for product 4', image: '/images/item4.jpg' },
  { id: 5, name: 'Product 5', description: 'Description for product 5', image: '/images/item5.jpg' },
  { id: 6, name: 'Product 6', description: 'Description for product 6', image: '/images/item6.jpg' },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search products={products} />} />
        <Route path="/product/:productId" element={<ProductPage products={products} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller-dashboard" element={<SellerDashboard products={products} />} />
        <Route path="/admin" element={<AdminPage />} /> 
        <Route path="/orders" element={<Orders orders={sampleBuyerOrders} />} />
        <Route path="/seller-orders" element={<SellerOrders orders={sampleSellerOrders} />} />
        <Route path="/post-product" element={<PostProduct />} />
        <Route path="/seller-dashboard" element={<SellerDashboard sellerId={1} />} />
        <Route path="/post-order" element={<PostOrder />} />
      </Routes>
    </Router>
  );
}

export default App;


