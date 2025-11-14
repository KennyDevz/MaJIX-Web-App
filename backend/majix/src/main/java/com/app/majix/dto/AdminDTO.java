package com.app.majix.dto;

public class AdminDTO extends UserDTO{

    public AdminDTO(){}

    public AdminDTO(Long id, String role, String firstname, String lastname, String email){
        super(id, role, firstname, lastname, email);
    }
}
