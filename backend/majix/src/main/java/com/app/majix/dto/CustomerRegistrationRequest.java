package com.app.majix.dto;

import jakarta.validation.constraints.*;

public class CustomerRegistrationRequest {

    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "First name cannot contain numbers or special characters")
    private String firstname;

    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Last name cannot contain numbers or special characters")
    private String lastname;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "Password must be 8+ chars, with 1 letter, 1 number, & 1 special char")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{11}$", message = "Phone number must be exactly 11 digits")
    private String phonenumber;

    // Getters and Setters
    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhonenumber() { return phonenumber; }
    public void setPhonenumber(String phonenumber) { this.phonenumber = phonenumber; }
}