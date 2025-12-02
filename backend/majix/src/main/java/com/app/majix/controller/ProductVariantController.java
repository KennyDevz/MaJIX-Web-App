package com.app.majix.controller;

import com.app.majix.entity.ProductVariant;
import com.app.majix.repository.ProductVariantRepository;
import com.app.majix.service.ProductVariantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/products-variants")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductVariantController {
    private final ProductVariantService productVariantService;
    private final ProductVariantRepository productVariantRepository;

    public ProductVariantController(ProductVariantService productVariantService, ProductVariantRepository productVariantRepository) {
        this.productVariantService = productVariantService;
        this.productVariantRepository = productVariantRepository;
    }

    @GetMapping("/{id}")
    public ProductVariant getProductVariantById(@PathVariable Long id) {
        return productVariantService.getProductVariantById(id);
    }


    @GetMapping("/{id}/stock")
    public ResponseEntity<Integer> getStock(@PathVariable Long id) {
        ProductVariant variant = productVariantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variant not found"));
        return ResponseEntity.ok(variant.getQuantityInStock());
    }

}
