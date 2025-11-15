package com.app.majix.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long cartId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    // Link to Customer
    @OneToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private double totalAmount;

    public Cart(){

    }

    public Cart(List<CartItem> cartItems, double totalAmount){
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
    }

    public void setCartId(Long cartId){
        this.cartId = cartId;
    }

    public Long getCartId(){
        return cartId;
    }

    public void setCartItems(List<CartItem> cartItems){
        this.cartItems = cartItems;
    }

    public List<CartItem> getCartItems(){
        return cartItems;
    }

    public void setCustomer(Customer customer){this.customer = customer;}
    public Customer getCustomer(){return this.customer;}

    public void setTotalAmount(double totalAmount){
        this.totalAmount = totalAmount;
    }

    public double getTotalAmount(){
        return totalAmount;
    }


}
