package com.app.majix.entity;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)//base for inheritance
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long UserId;
    private String email;
    private String firstname;
    private String lastname;
    private String role;
//    private boolean isLoggedIn;
    public User(){}
    public User(String email, String firstname, String lastname, String role){
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
    }

    public void setUserId(Long UserId){this.UserId = UserId;}
    public void setEmail(String email){this.email = email;}
    public void setFirstname(String firstname){this.firstname = firstname;}
    public void setLastname(String lastname){this.lastname = lastname;}

    public void setRole(String role){this.role = role;}
//    public void setIsLoggedIn(boolean isLoggedIn){this.isLoggedIn = isLoggedIn;}

    public Long getUserId(){return this.UserId;}
    public String getEmail(){return this.email;}
    public String getFirstname(){return this.firstname;}
    public String getLastname(){return this.lastname;}
    public String getRole(){return this.role;}
//    public boolean getIsLoggedIn(){return this.isLoggedIn;}

}
