package com.app.majix.repository;

import com.app.majix.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    List<ProductVariant> findByProductProductId(Long productId);


    @Query("SELECT DISTINCT v.color FROM ProductVariant v WHERE v.color IS NOT NULL")
    List<String> findDistinctColors();

    // ✅ Find a specific product variant by its ID
    Optional<ProductVariant> findById(Long id);

    // ✅ Optional: you can add more queries later, e.g., find variants by product
    // List<ProductVariant> findByProductId(Long productId);
}