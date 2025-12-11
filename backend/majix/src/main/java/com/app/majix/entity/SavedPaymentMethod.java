package com.app.majix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class SavedPaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private Customer customer;

    private String type;       // e.g., "Credit Card", "GCash"
    private String identifier; // e.g., "**** 1234"

    // The "Simulated" Balance (Only for external cards)
    private double mockBalance;

    public SavedPaymentMethod() {}

    public SavedPaymentMethod(Customer customer, String type, String identifier, double mockBalance) {
        this.customer = customer;
        this.type = type;
        this.identifier = identifier;
        this.mockBalance = mockBalance;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getIdentifier() { return identifier; }
    public void setIdentifier(String identifier) { this.identifier = identifier; }

    public double getMockBalance() { return mockBalance; }
    public void setMockBalance(double mockBalance) { this.mockBalance = mockBalance; }
}