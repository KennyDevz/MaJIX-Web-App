package com.app.majix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "returns")
public class Returns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long returnId;

    // --- NEW RELATIONSHIPS ---
    // Link to the specific item variant purchased
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id", nullable = false)
    private OrderItem orderItem;

    // Link to the customer who requested it
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // --- FIELDS ---
    private String reason;
    private String status;
    private int quantity;

    // Changed from String to LocalDateTime for easier sorting/formatting
    private LocalDateTime requestDate;

    // --- CONSTRUCTORS ---
    public Returns() {
        this.requestDate = LocalDateTime.now(); // Automatically set timestamp
        this.status = "PENDING";                // Default status
    }

    public Returns(OrderItem orderItem, Customer customer, String reason, int quantity) {
        this.orderItem = orderItem;
        this.customer = customer;
        this.reason = reason;
        this.quantity = quantity;
        this.status = "PENDING";
        this.requestDate = LocalDateTime.now();
    }

    // --- GETTERS AND SETTERS ---
    public Long getReturnId() { return returnId; }
    public void setReturnId(Long returnId) { this.returnId = returnId; }

    public OrderItem getOrderItem() { return orderItem; }
    public void setOrderItem(OrderItem orderItem) { this.orderItem = orderItem; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public LocalDateTime getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDateTime requestDate) { this.requestDate = requestDate; }
}