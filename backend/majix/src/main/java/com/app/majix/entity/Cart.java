package com.app.majix.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long cartId;

    private String cartItems; //will later become List<CartItem>
    private double totalAmount;

    public Cart(){

    }

    public Cart(String cartItems, double totalAmount){
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
    }

    public void setCartId(Long cartId){
        this.cartId = cartId;
    }

    public Long getCardId(){
        return cartId;
    }

    public void setCartItems(String cartItems){
        this.cartItems = cartItems;
    }

    public String getCartItems(){
        return cartItems;
    }

    public void setTotalAmount(double totalAmount){
        this.totalAmount = totalAmount;
    }

    public double getTotalAmount(){
        return totalAmount;
    }



}
