package com.app.majix.dto;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;

public class AdminCustomerViewDTO {
    private Long userId;
    private String email;
    private String firstname;
    private String lastname;
    private String phonenumber;
    private String role;
    private int totalOrders;
    private double totalSpent;
    private LocalDate joinDate; // Note: Your User entity currently lacks a creation timestamp

    public AdminCustomerViewDTO(Long userId, String email, String firstname, String lastname,
                                String phonenumber, String role, int totalOrders,
                                double totalSpent, LocalDate joinDate) {
        this.userId = userId;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.role = role;
        this.totalOrders = totalOrders;
        this.totalSpent = totalSpent;
        this.joinDate = joinDate;
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getFirstname() { return firstname; }
    public String getLastname() { return lastname; }
    public String getPhonenumber() { return phonenumber; }
    public String getRole() { return role; }
    public int getTotalOrders() { return totalOrders; }
    public double getTotalSpent() { return totalSpent; }
    public LocalDate getJoinDate() { return joinDate; }
}