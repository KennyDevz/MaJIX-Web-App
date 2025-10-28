package com.app.majix.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    // Placeholder fields for relationships (to be added later)
    private String customer;        // Will later reference a Customer entity
    private String orderItems;      // Will later become a List<OrderItem>
    private String payment;         // Will later become a Payment object
    private String shippingAddress; // Will later become an Address object

    // Other attributes
    private double totalAmount;
    private String status;
    private String orderDate;

    // --- Constructors ---
    public Orders() {}

    public Orders(String customer, String orderItems, String payment,
                 String shippingAddress, double totalAmount, String status, String orderDate) {
        this.customer = customer;
        this.orderItems = orderItems;
        this.payment = payment;
        this.shippingAddress = shippingAddress;
        this.totalAmount = totalAmount;
        this.status = status;
        this.orderDate = orderDate;
    }

    // --- Getters and Setters ---
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(String orderItems) {
        this.orderItems = orderItems;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    // --- Methods from class diagram (placeholders for now) ---
    public void calculateTotalAmount() {
        // Logic to calculate total amount will go here later
    }

    public void applyDiscount() {
        // Logic to apply discount will go here later
    }
}
