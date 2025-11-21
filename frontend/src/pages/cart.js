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
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user?.id) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8081/api/cart/${user.id}`);
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

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
              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                <ul>
                  {cartItems.map((item, id) => (
                    <CartItem 
                      key={id} 
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