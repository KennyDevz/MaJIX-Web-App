import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import CartItem from "../components/cart/cart_item";
import OrderSummary from "../components/cart/order_summary";
import BreadCrumbs from "../components/breadcrumbs";
import CartLogo from "../assets/cart-logo.png";
import { UserContext } from "../context/UserContext";
import "../styles/Cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState({ cartItems: [], totalAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user?.id) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8081/api/cart/${user.id}`);
        setCart(response.data);
        console.log(response)//for checking
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
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
                      id = {item.cartItemId}
                      name={item.productName} 
                      size={item.size} 
                      color={item.color} 
                      price={item.subtotal} 
                      image={item.productImage} 
                      qty={item.qty} 
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
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}