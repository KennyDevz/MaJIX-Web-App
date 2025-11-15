package com.app.majix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private Customer customer;

    private int rating;

    @Lob // For long text
    private String comment;

    private LocalDateTime datePosted;

    public String getCustomerName() {
        if (customer != null) {
            return customer.getFirstname() + " " + customer.getLastname().charAt(0) + ".";
        }
        return "Anonymous";
    }

    // --- Getters and Setters ---
    public Long getReviewId() { return reviewId; }
    public void setReviewId(Long reviewId) { this.reviewId = reviewId; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getDatePosted() { return datePosted; }
    public void setDatePosted(LocalDateTime datePosted) { this.datePosted = datePosted; }
}