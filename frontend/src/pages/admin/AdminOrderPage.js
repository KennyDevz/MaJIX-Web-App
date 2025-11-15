import React from 'react';
import '../../styles/admin/AdminLayout.css';
import '../../styles/admin/AdminOrderPage.css';


// Mock data to populate the order list
const mockOrders = [
  {
    id: '12345',
    totalPrice: 125.75,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    shipping: {
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
    items: [
      { id: 'p1', name: 'Classic Black Hoodie', quantity: 1, price: 99.75 },
    ],
    status: 'Pending',
  },
  {
    id: '12346',
    totalPrice: 180.50,
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    shipping: {
      address: '456 Oak Ave',
      city: 'Someville',
      state: 'NY',
      zip: '67890',
    },
    items: [
      { id: 'p2', name: 'MaJiX Polo Shirt', quantity: 2, price: 60.25 },
      { id: 'p3', name: 'Vintage Logo Tee', quantity: 1, price: 60.00 },
    ],
    status: 'Shipped',
  },
];

export default function AdminOrderPage() {
  return (
    <>
      {/* Start with the content header */}
      <div className="content-header">
        <h2>ORDER MANAGEMENT</h2>
        
        <select className="order-filter-dropdown">
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* And the list of orders */}
      <div className="order-list">
        {mockOrders.map((order) => (
          <div className="order-card" key={order.id}>
            {/* Order Header */}
            <div className="order-card-header">
              <h3>Order Number #{order.id}</h3>
              <span className="order-total-price">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Order Body */}
            <div className="order-card-body">
              <div className="order-detail-section">
                <h4>Customer Details</h4>
                <p>{order.customer.name}</p>
                <p>{order.customer.email}</p>
              </div>
              <div className="order-detail-section">
                <h4>Shipping Address</h4>
                <p>{order.shipping.address}</p>
              </div>
            </div>

            {/* Order Footer (Items List) */}
            <div className="order-card-footer">
              <h4>Order Items</h4>
              {order.items.map((item) => (
                <div className="order-item-row" key={item.id}>
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}