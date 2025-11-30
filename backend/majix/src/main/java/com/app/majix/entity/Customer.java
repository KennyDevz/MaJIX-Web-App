package com.app.majix.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.*;

import java.util.List;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import jakarta.persistence.OneToOne;

@Entity
public class Customer extends User{
    private String phonenumber;

    // One-to-one relationship with Cart (optional)
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cart> carts;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    public Customer(){this.setRole("CUSTOMER");}

    public Customer(String email, String password, String firstname, String lastname, String phonenumber){
        super(email, password, firstname,lastname,"CUSTOMER");
        this.phonenumber = phonenumber;
    }

    public List<Review> getReviews() {
        return reviews;
    }
    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public String getPhonenumber(){return this.phonenumber;};

    public void setPhonenumber(String phonenumber){this.phonenumber = phonenumber;}

    public List<Cart> getCarts() { return carts; }
    public void setCarts(List<Cart> carts) { this.carts = carts; }
}
