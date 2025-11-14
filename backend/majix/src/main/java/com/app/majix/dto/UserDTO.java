package com.app.majix.dto;

public class UserDTO {
    private Long id;
    private String role;
    private String firstname;
    private String lastname;
    private String email;

    // Default constructor
    public UserDTO() {}

    // All-args constructor
    public UserDTO(Long id, String role, String firstname, String lastname, String email) {
        this.id = id;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }


}
