package com.app.majix.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId; 

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String category; 

    private String imageUrl;

    // link to the variants, as in 'Product (1) owns (1..*) ProductVariant' 
    // 'mappedBy = "product"' tells JPA the 'product' field in ProductVariant owns this relationship
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProductVariant> variants; 
    
    // link to Reviews
     @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
     private List<Review> reviews;

    // --- Constructors ---
    public Product() {}

    public Product(String name, String description, String category, String imageUrl) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
    }

    public int getTotalStock(){
        if (variants == null){
            return 0;
        }
        return variants.stream().mapToInt(ProductVariant::getQuantityInStock).sum();
    }

    // This "virtual" property will appear as "averageRating" in your JSON response
    public Double getAverageRating() {
        if (reviews == null || reviews.isEmpty()) {
            return 0.0;
        }

        // Calculate the average rating
        return reviews.stream()
                .mapToInt(Review::getRating) // Get the rating from each review
                .average()
                .orElse(0.0);
    }

    // You might also want the total number of reviews to show (e.g., "4.5 stars (12 reviews)")
    public int getReviewCount() {
        if (reviews == null) {
            return 0;
        }
        return reviews.size();
    }

    // --- Getters and Setters ---
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<ProductVariant> getVariants() {
        return variants;
    }

    public void setVariants(List<ProductVariant> variants) {
        this.variants = variants;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
     public List<Review> getReviews() { return reviews; }

     public void setReviews(List<Review> reviews) { this.reviews = reviews;}
}