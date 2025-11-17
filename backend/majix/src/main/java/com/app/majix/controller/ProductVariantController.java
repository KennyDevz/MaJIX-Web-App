package com.app.majix.controller;

import com.app.majix.entity.ProductVariant;
import com.app.majix.service.ProductVariantService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/products-variants")
public class ProductVariantController {
    private final ProductVariantService productVariantService;

    public ProductVariantController(ProductVariantService productVariantService) {
        this.productVariantService = productVariantService;
    }

    @GetMapping("/{id}")
    public ProductVariant getProductVariantById(@PathVariable Long id) {
        return productVariantService.getProductVariantById(id);
    }
}
