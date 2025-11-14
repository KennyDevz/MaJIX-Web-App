package com.app.majix.entity;

import jakarta.persistence.Entity;

@Entity
public class Customer extends User{
    private String phonenumber;

    public Customer(){this.setRole("CUSTOMER");}

    public Customer(String email, String password, String firstname, String lastname, String phonenumber){
        super(email, password, firstname,lastname,"CUSTOMER");
        this.phonenumber = phonenumber;
    }

    public String getPhonenumber(){return this.phonenumber;};

    public void setPhonenumber(String phonenumber){this.phonenumber = phonenumber;}

}
