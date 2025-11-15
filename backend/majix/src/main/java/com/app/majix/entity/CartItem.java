package com.app.majix.entity;

import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long cartItemId;

    private Long productId;

    private int qty;
    private double price;

    //Constructor
    public CartItem(){

    }

    public CartItem(int qty, double price){
        this.qty = qty;
        this.price = price;
    }

    //setters and getters

    public void setCartItemId(Long cartItemId){
        this.cartItemId = cartItemId;
    }

    public Long getCartItemId(){
        return cartItemId;
    }

    public void setQty(int qty){
        this.qty = qty;
    }

    public int getQty(){
        return qty;
    }

    public void setPrice(double price){
        this.price = price;
    }

    public double getPrice(){
        return price;
    }



}
