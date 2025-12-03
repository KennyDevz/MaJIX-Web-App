package com.app.majix.service;

import org.springframework.stereotype.Service;

import com.app.majix.repository.ProductRepository;
import com.app.majix.repository.ProductVariantRepository;
import com.app.majix.exception.ProductNotFoundException;
import com.app.majix.entity.Product;
import com.app.majix.entity.ProductVariant;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;

    public ProductService(ProductRepository productRepository, ProductVariantRepository productVariantRepository) {
        this.productRepository = productRepository;
        this.productVariantRepository = productVariantRepository;
    }   

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<String> getAvailableColors() {
        return productVariantRepository.findDistinctColors();
    }

    public Product getProductById(Long id) {
        Optional<Product> productOpt = productRepository.findById(id);
        return productOpt.orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));
    }   
    

    //Admin methods
    @Transactional
    public Product createProduct(Product productData, List<ProductVariant> variants) {
        Product savedProduct = productRepository.save(productData);

        for(ProductVariant variant : variants) {
            variant.setProduct(savedProduct);
            productVariantRepository.save(variant);
        }

        savedProduct.setVariants(variants);
        return savedProduct;
    }

    @Transactional
    public Product updateProduct(Long productId, Product productDetails, List<ProductVariant> newVariants) {
        // 1. Find the existing product
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + productId + " not found"));

        // 2. Update the simple product fields
        existingProduct.setName(productDetails.getName());
        existingProduct.setDescription(productDetails.getDescription());
        existingProduct.setCategory(productDetails.getCategory());
        existingProduct.setImageUrl(productDetails.getImageUrl());


        // 3. Create a list of variant IDs from the frontend
        List<Long> newVariantIds = new ArrayList<>();
        if (newVariants != null) {
            for (ProductVariant v : newVariants) {
                if (v.getVariantId() != null) {
                    newVariantIds.add(v.getVariantId());
                }
            }
        }

        // 4. Delete any *old* variants that are NOT in the new list
        List<ProductVariant> oldVariants = productVariantRepository.findByProductProductId(productId);
        for (ProductVariant oldVariant : oldVariants) {
            if (!newVariantIds.contains(oldVariant.getVariantId())) {
                // This variant was removed in the UI, so delete it
                productVariantRepository.delete(oldVariant);
            }
        }

        // 5. Update or Add variants from the new list
        List<ProductVariant> savedVariants = new ArrayList<>();
        if (newVariants != null) {
            for(ProductVariant v : newVariants) {
                v.setProduct(existingProduct); // Set the parent product
                
                // save() will work as "INSERT" if ID is null
                // and "UPDATE" if ID is not null.
                savedVariants.add(productVariantRepository.save(v));
            }
        }
        

        existingProduct.setVariants(savedVariants);
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long productId) {
        if(!productRepository.existsById(productId)) {
            throw new ProductNotFoundException("Product with ID " + productId + " not found");
        }
        productRepository.deleteById(productId);
    }



    
}
