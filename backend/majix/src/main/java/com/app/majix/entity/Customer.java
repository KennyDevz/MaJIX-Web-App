package com.app.majix.entity;

import jakarta.persistence.Entity;

@Entity
public class Customer extends User{
    public Customer(){this.setRole("CUSTOMER");}
    public Customer(String email, String firstname, String lastname){
        super(email,firstname,lastname,"CUSTOMER");
    }
}
