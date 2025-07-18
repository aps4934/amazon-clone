import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Header, 
  Homepage, 
  ProductListing, 
  ProductDetails, 
  Cart, 
  Checkout, 
  SignIn, 
  Account,
  SearchResults 
} from "./components";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('amazonCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amazonCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header 
          user={user} 
          cartItemCount={getCartItemCount()} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/category/:category" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/search" element={<SearchResults searchQuery={searchQuery} />} />
          <Route path="/cart" element={
            <Cart 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              getCartTotal={getCartTotal}
            />
          } />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} getCartTotal={getCartTotal} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/account" element={<Account user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;