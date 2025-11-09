package com.app.majix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long variantId; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false) // This creates the FK column
    @JsonIgnore
    private Product product;
    private String size; 
    private String color; 
    private double price; 
    private int quantityInStock; 
    private String imageUrl;

    // --- Constructors ---
    public ProductVariant() {}

    public ProductVariant(Product product, String size, String color, double price, int quantityInStock, String imageUrl) {
        this.product = product;
        this.size = size;
        this.color = color;
        this.price = price;
        this.quantityInStock = quantityInStock;
        this.imageUrl = imageUrl;
    }

    // --- Getters and Setters ---
    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(int quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}