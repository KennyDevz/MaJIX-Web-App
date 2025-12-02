import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import CartItem from "../components/cart/cart_item";
import OrderSummary from "../components/cart/order_summary";
import BreadCrumbs from "../components/breadcrumbs";
import CartLogo from "../assets/cart-logo.png";
import { UserContext } from "../context/UserContext";
import { useCallback } from "react";
import "../styles/Cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState({ cartItems: [], totalAmount: 0 });
  const [stocks, setStocks] = useState({}); // variantId -> stock
  const [loading] = useState(false);//not used but kept for future use
  const [error, setError] = useState(null);

  const isCartEmpty = cart.cartItems.length === 0;
  
  const fetchCart = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await axios.get(`http://localhost:8081/api/cart/${user.id}`);
      setCart(response.data);
      console.log(response);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.response?.data?.error || err.message);
    } 
  }, [user?.id]);  // <-- stable reference

  useEffect(() => {
    const fetchStocks = async () => {
      const newStocks = {};
      for (let item of cart.cartItems) {
        const res = await axios.get(`http://localhost:8081/api/products-variants/${item.variantId}/stock`);
        newStocks[item.variantId] = res.data;
      }
      setStocks(newStocks);
    };

    if (cart.cartItems.length > 0) fetchStocks();
  }, [cart.cartItems]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // <-- no warning now

  const handleIncrement = async (id) => {
  setCart(prev => ({
    ...prev,
    cartItems: prev.cartItems.map(item =>
      item.cartItemId === id ? { ...item, qty: item.qty + 1 } : item
    )
  }));

  try {
    await axios.put(`http://localhost:8081/api/cart-item/${id}/increment`);
    fetchCart(); // optional: to sync in case of discrepancies
  } catch (e) {
    alert(e.response?.data?.message || e.message);
    fetchCart(); // rollback in case of error
  }
};

  const handleDecrement = async (id) => {
  setCart(prev => ({
    ...prev,
    cartItems: prev.cartItems.map(item =>
      item.cartItemId === id ? { ...item, qty: item.qty - 1 } : item
    )
  }));

  try {
    await axios.put(`http://localhost:8081/api/cart-item/${id}/decrement`);
    fetchCart(); // optional
  } catch (e) {
    alert(e.response?.data?.error || e.message);
    fetchCart(); // rollback
  }
};


  const handleRemoveCartItem = async (id) => {
  try {
    await axios.delete(`http://localhost:8081/api/cart/item/${id}`);
    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

  const handleCheckoutClick = () => {
    if (isCartEmpty) return;
    navigate('/checkout');
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cart-page-wrapper">
      {!user ? (
        <div className="cart-empty-container">
          <div className="cart-icon-circle">
            <img src={CartLogo} alt="cart-icon" className="cart-icon-image" />
          </div>
          <p className="cart-sign-in-text">Please sign in to add items to cart.</p>
        </div>
      ) : (
        <div className="cart-content-container">
          
          <div className="cart-breadcrumbs-container">
            <BreadCrumbs page='Cart' />
          </div>

          <div className="cart-main-layout">
            {/* List of cart items */}
            <div className="cart-items-list">
              {cart.cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                <ul>
                  {cart.cartItems?.map((item, id) => (
                    <CartItem 
                      key={id} 
                      removeCartItem = {handleRemoveCartItem}
                      incrementQty = {handleIncrement}
                      decrementQty = {handleDecrement}
                      id = {item.cartItemId}
                      name={item.productName} 
                      size={item.size} 
                      color={item.color} 
                      price={item.subtotal} 
                      image={item.productImage} 
                      qty={item.qty} 
                      stock = {stocks[item.variantId]}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Order summary */}
            <div className="cart-summary-container">
              <OrderSummary
                totalAmount={cart.totalAmount}
                buttonText="Go to Checkout"
                onButtonClick={handleCheckoutClick}
                disabled={isCartEmpty}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}