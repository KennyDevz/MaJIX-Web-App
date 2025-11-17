package com.app.majix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    @ManyToOne
    @JoinColumn(name = "cart_id") // Foreign key -> Cart
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    private int qty;

    private double subtotal;

    public CartItem() {
    }

    public CartItem(Cart cart, ProductVariant productVariant, int qty){
        this.cart = cart;
        this.productVariant = productVariant;
        setQty(qty); // subtotal calculated automatically
    }

    // --- Helper to calculate subtotal ---
    private void recalcSubtotal() {
        if (productVariant != null) {
            this.subtotal = this.qty * productVariant.getPrice();
        }
    }

    public void setCart(Cart cart){ this.cart = cart; }
    public Cart getCart(){ return this.cart; }

    public void setProductVariant(ProductVariant productVariant){
        this.productVariant = productVariant;
        recalcSubtotal(); // recalc subtotal automatically
    }
    public ProductVariant getProductVariant(){ return this.productVariant; }

    public void setCartItemId(Long cartItemId){ this.cartItemId = cartItemId; }
    public Long getCartItemId(){ return cartItemId; }

    public void setQty(int qty){
        this.qty = qty;
        recalcSubtotal();
    }
    public int getQty(){ return qty; }

    public void setSubtotal(double subtotal){ this.subtotal = subtotal; }
    public double getSubtotal(){ return subtotal; }
}
