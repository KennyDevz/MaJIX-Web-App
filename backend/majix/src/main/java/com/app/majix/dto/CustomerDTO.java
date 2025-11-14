package com.app.majix.dto;

import com.app.majix.entity.Customer;

public class CustomerDTO extends UserDTO{
    private String phonenumber; // optional, only for Customer

    public CustomerDTO(){}

    public CustomerDTO(Long id, String role, String firstname, String lastname, String email, String phonenumber){
        super(id, role, firstname, lastname, email);
        this.phonenumber = phonenumber;
    }

    public String getPhonenumber() { return phonenumber; }
    public void setPhonenumber(String phonenumber) { this.phonenumber = phonenumber; }
}
