package com.app.majix.dto;

import java.util.List;

public class CartDTO {
    private Long id;
    private List<CartItemResponseDTO> cartItems; // or a CartItemDTO if you have cart items
    private double totalAmount;

    public CartDTO(){}
    public CartDTO(Long id, List<CartItemResponseDTO> cartItems, double totalAmount){
        this.id = id;
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<CartItemResponseDTO> getCartItems() { return cartItems; }
    public void setCartItems(List<CartItemResponseDTO> cartItems) { this.cartItems = cartItems; }

    public double getTotalAmount(){return this.totalAmount;}
    public void setTotalAmount(double totalAmount){this.totalAmount = totalAmount;}
}
