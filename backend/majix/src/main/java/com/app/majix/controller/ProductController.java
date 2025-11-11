package com.app.majix.controller;

import org.springframework.web.bind.annotation.*;
import com.app.majix.service.ProductService;
import com.app.majix.controller.dto.ProductCreationRequest;
import com.app.majix.entity.Product;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/colors")
    public List<String> getDistinctColors() {
        return productService.getAvailableColors();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody ProductCreationRequest request) {
        return productService.createProduct(request.getProduct(), request.getVariants());

    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody ProductCreationRequest request) {
        return productService.updateProduct(id, request.getProduct(), request.getVariants());
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

}
