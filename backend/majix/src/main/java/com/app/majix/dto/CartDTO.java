package com.app.majix.dto;

import java.util.List;

public class CartDTO {
    private Long id;
    private List<Object> cartItems; // or a CartItemDTO if you have cart items

    public CartDTO(){}
    public CartDTO(Long id, List<Object> cartItems){
        this.id = id;
        this.cartItems = cartItems;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<Object> getCartItems() { return cartItems; }
    public void setCartItems(List<Object> cartItems) { this.cartItems = cartItems; }
}
