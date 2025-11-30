package com.app.majix.dto;

import java.util.List;

public class OrderResponseDTO {
    private Long orderId;
    private String status;
    private double totalAmount;
    private String orderDate;
    private String paymentMethod;
    private String shippingAddress;
    private List<OrderItemDTO> items;

    // Optional: You can include the linked Cart ID if you want to show it
    private Long linkedCartId;

    public OrderResponseDTO(Long orderId, String status, double totalAmount, String orderDate, String paymentMethod, String shippingAddress, List<OrderItemDTO> items, Long linkedCartId) {
        this.orderId = orderId;
        this.status = status;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
        this.items = items;
        this.linkedCartId = linkedCartId;
    }

    // --- Getters and Setters ---
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
    public Long getLinkedCartId() { return linkedCartId; }
    public void setLinkedCartId(Long linkedCartId) { this.linkedCartId = linkedCartId; }
}