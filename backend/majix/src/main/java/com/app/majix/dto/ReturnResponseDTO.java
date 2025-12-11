package com.app.majix.dto;

public class ReturnResponseDTO {
    private Long returnId;
    private String reason;
    private String status;
    private String requestDate;
    private String orderId; // or Long
    private String customerName;
    private String productName;
    private String imageUrl;

    public ReturnResponseDTO(Long returnId, String reason, String status, String requestDate,
                             Long orderId, String customerName, String productName,String imageUrl) {
        this.returnId = returnId;
        this.reason = reason;
        this.status = status;
        this.requestDate = requestDate;
        this.orderId = String.valueOf(orderId);
        this.customerName = customerName;
        this.productName = productName;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getReturnId() { return returnId; }
    public void setReturnId(Long returnId) { this.returnId = returnId; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRequestDate() { return requestDate; }
    public void setRequestDate(String requestDate) { this.requestDate = requestDate; }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}