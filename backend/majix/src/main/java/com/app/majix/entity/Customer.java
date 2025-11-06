package com.app.majix.entity;

import jakarta.persistence.Entity;

@Entity
public class Customer extends User{
    public Customer(){this.setRole("CUSTOMER");}
    public Customer(String email, String password, String firstname, String lastname){
        super(email, password, firstname,lastname,"CUSTOMER");
    }
}
