package com.app.majix.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.boot.autoconfigure.web.WebProperties;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long productId;

    private String name;
    private String description;
    private String color;
    private String size;
    private double price;
    private int stockQuantity;
    private String category;

    //constructors
    public Product(){

    }

    public Product(String name, String description, String color, String size, double price, int stockQuantity, String category){
        this.name = name;
        this.description = description;
        this.color = color;
        this.size = size;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.category = category;
    }

    //setters and getters
    public void setProductId(Long productId){
        this.productId = productId;
    }

    public Long getProductId(){
        return productId;
    }

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }

    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return description;
    }

    public void setColor(String color){
        this.color = color;
    }
    public String getColor(){
        return color;
    }

    public void setSize(String size){
        this.size = size;
    }
    public String getSize(){
        return size;
    }

    public void setPrice(double price){
        this.price = price;
    }

    public double getPrice(){
        return price;
    }

    public void setStockQuantity(int stockQuantity){
        this.stockQuantity = stockQuantity;
    }

    public int getStockQuantity(){
        return stockQuantity;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String getCategory(){
        return category;
    }
}
