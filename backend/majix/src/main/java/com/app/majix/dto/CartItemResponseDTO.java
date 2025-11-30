package com.app.majix.dto;

public class CartItemResponseDTO {
    private Long cartItemId;
    private Long productId;
    private Long variantId;

    private String productName;
    private String productImage;

    private String size;
    private String color;
    private double price;
    private double subtotal;

    private int qty;

    public CartItemResponseDTO(){}

    public CartItemResponseDTO(Long cartItemId, Long productId, Long variantId, String productName, String productImage
                                , String size, String color, double price, double subtotal, int qty){
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.variantId = variantId;
        this.productName = productName;
        this.productImage = productImage;
        this.size = size;
        this.color = color;
        this.price = price;
        this.subtotal = subtotal;
        this.qty = qty;
    }

    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getPrice() { return price; }

    public void setPrice(double price) { this.price = price; }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
