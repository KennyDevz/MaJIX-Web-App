package com.app.majix.dto;

public class CartItemDTO {
    private Long cartItemId;
    private Long variantId;
    private int qty;
    private double subtotal;

    public CartItemDTO(Long cartItemId, Long variantId, int qty, double subtotal) {
        this.cartItemId = cartItemId;
        this.variantId = variantId;
        this.qty = qty;
        this.subtotal = subtotal;
    }

    public Long getCartItemId() { return cartItemId; }
    public void setCartItemId(Long cartItemId) { this.cartItemId = cartItemId; }

    public Long getVariantId() { return variantId; }
    public void setVariantId(Long variantId) { this.variantId = variantId; }

    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }

    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }
}

