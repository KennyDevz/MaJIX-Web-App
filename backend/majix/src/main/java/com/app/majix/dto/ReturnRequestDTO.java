package com.app.majix.dto;

public class ReturnRequestDTO {

    private Long orderItemId; // The ID of the specific item variant in the order
    private String reason;    // The reason for return

    // --- Constructors ---
    public ReturnRequestDTO() {}

    public ReturnRequestDTO(Long orderItemId, String reason) {
        this.orderItemId = orderItemId;
        this.reason = reason;
    }

    // --- Getters and Setters ---
    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}