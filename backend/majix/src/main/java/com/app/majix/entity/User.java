package com.app.majix.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)//base for inheritance
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId; //rename to "id" later for clarity
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String role;

    @CreationTimestamp
    private LocalDate joinDate;

//    private boolean isLoggedIn;
    public User(){}
    public User(String email, String password, String firstname, String lastname, String role, LocalDate joinDate){
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.joinDate = joinDate;
    }

    public void setUserId(Long UserId){this.userId = UserId;}
    public void setEmail(String email){this.email = email;}
    public void setPassword(String password){this.password = password;}
    public void setFirstname(String firstname){this.firstname = firstname;}
    public void setLastname(String lastname){this.lastname = lastname;}
    public void setRole(String role){this.role = role;}
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate;}
//    public void setIsLoggedIn(boolean isLoggedIn){this.isLoggedIn = isLoggedIn;}

    public Long getUserId(){return this.userId;}
    public String getEmail(){return this.email;}
    public String getPassword(){return this.password;}
    public String getFirstname(){return this.firstname;}
    public String getLastname(){return this.lastname;}
    public String getRole(){return this.role;}
    public LocalDate getJoinDate() { return joinDate;}
//    public boolean getIsLoggedIn(){return this.isLoggedIn;}

}
