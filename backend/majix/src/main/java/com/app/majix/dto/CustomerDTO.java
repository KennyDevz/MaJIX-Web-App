package com.app.majix.dto;

import com.app.majix.entity.Cart;
import com.app.majix.entity.Customer;

public class CustomerDTO extends UserDTO{
    private String phonenumber; // optional, only for Customer
    private CartDTO cart;

    public CustomerDTO(){}

    public CustomerDTO(Long id, String role, String firstname, String lastname, String email, String phonenumber, CartDTO cart){
        super(id, role, firstname, lastname, email);
        this.phonenumber = phonenumber;
        this.cart = cart;
    }

    public String getPhonenumber() { return phonenumber; }
    public void setPhonenumber(String phonenumber) { this.phonenumber = phonenumber; }

    public CartDTO getCart(){return this.cart;}
    public void setCart(CartDTO cart){this.cart = cart;}
}
