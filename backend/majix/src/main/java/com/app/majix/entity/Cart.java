package com.app.majix.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    // Link to Customer
    @OneToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;

    private double totalAmount;

    public Cart() {
    }

    public Cart(List<CartItem> cartItems) {
        this.cartItems = cartItems;
        calculateTotalAmount();
    }

     //ADDED CONSTRUCTOR --- optional, useful for creating cart with customer directly
     public Cart(Customer customer) {
         this.customer = customer;
         this.cartItems = new ArrayList<>();
         calculateTotalAmount();
     }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    // --- Helper methods to manage cart items ---
    public void addCartItem(CartItem item) {
        cartItems.add(item);
        item.setCart(this);
        calculateTotalAmount();
    }

    public void removeCartItem(CartItem item) {
        cartItems.remove(item);
        item.setCart(null);
        calculateTotalAmount();
    }

    // --- Calculate total amount dynamically ---
    public void calculateTotalAmount() {
        double total = 0.0;
        for (CartItem item : cartItems) {
            total += item.getSubtotal(); // NOTE: CartItem must have getSubtotal() method
        }
        this.totalAmount = total;
    }
}
