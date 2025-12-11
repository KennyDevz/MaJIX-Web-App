package com.app.majix.dto;

public class OrderRequestDTO {
    private Long userId;
    private String paymentMethod;

    // IF using a saved card, this ID is sent. IF COD, this is null.
    private Long savedPaymentMethodId;

    // Address Fields
    private String street;
    private String city;
    private String province;
    private String country;
    private String zipCode;

    // --- Getters and Setters ---
    public Long getSavedPaymentMethodId() { return savedPaymentMethodId; }
    public void setSavedPaymentMethodId(Long savedPaymentMethodId) { this.savedPaymentMethodId = savedPaymentMethodId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getProvince() { return province; }
    public void setProvince(String province) { this.province = province; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
}