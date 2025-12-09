package com.app.majix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private Customer customer;

    // --- CHANGE: Link to the specific Cart ---
    @OneToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "cartId")
    private Cart cart;
    // ---------------------------------------

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> orderItems = new ArrayList<>();

    // Address Snapshot (Stored as Text for simplicity & safety)
    @Column(columnDefinition = "TEXT")
    private String shippingAddress;

    private double totalAmount;
    private String status; // "PENDING", "SHIPPED"
    private String orderDate;
    private String paymentMethod;

    private String shippedDate;
    private String deliveredDate;

    // Constructors
    public Orders() {}

    // Getters and Setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }

    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getShippedDate() { return shippedDate; }
    public void setShippedDate(String shippedDate) { this.shippedDate = shippedDate; }

    public String getDeliveredDate() { return deliveredDate; }
    public void setDeliveredDate(String deliveredDate) { this.deliveredDate = deliveredDate; }
}