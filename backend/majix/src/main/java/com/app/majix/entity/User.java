package com.app.majix.entity;

public class User {
    private Long UserId;
    private String email;
    private String firstname;
    private String lastname;
    private boolean isLoggedIn;
    public User(){

    }

    public void setEmail(String email){this.email = email;}
    public void setFirstname(String firstname){this.firstname = firstname;}

}
