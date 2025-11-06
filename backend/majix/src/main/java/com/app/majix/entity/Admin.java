package com.app.majix.entity;

import jakarta.persistence.Entity;

@Entity
public class Admin extends User{

    public Admin(){this.setRole("ADMIN");}
    public Admin(String email, String password, String firstname, String lastname){
        super(email, password, firstname,lastname, "ADMIN");
    }
}
