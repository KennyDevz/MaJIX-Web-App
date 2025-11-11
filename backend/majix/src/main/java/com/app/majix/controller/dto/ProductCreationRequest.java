package com.app.majix.controller.dto;

import com.app.majix.entity.Product;
import com.app.majix.entity.ProductVariant;

import java.util.List;

public class ProductCreationRequest {

    private Product product;
    private List<ProductVariant> variants;

    // --- Getters and Setters ---
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<ProductVariant> getVariants() {
        return variants;
    }

    public void setVariants(List<ProductVariant> variants) {
        this.variants = variants;
    }
    
}
