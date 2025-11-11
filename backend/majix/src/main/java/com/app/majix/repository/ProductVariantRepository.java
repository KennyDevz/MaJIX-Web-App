package com.app.majix.repository;

import com.app.majix.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    List<ProductVariant> findByProductProductId(Long productId);


    @Query("SELECT DISTINCT v.color FROM ProductVariant v WHERE v.color IS NOT NULL")
    List<String> findDistinctColors();
}