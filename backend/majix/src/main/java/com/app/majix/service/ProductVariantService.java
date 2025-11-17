package com.app.majix.service;

import com.app.majix.entity.ProductVariant;
import com.app.majix.repository.ProductVariantRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductVariantService {
    private final ProductVariantRepository productVariantRepository;

    public ProductVariantService(ProductVariantRepository productVariantRepository) {
        this.productVariantRepository = productVariantRepository;
    }

    public ProductVariant getProductVariantById(Long id) {
        return productVariantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ProductVariant not found with id: " + id));
    }
}
