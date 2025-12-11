package com.app.majix.repository;

import com.app.majix.entity.SavedPaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SavedPaymentMethodRepository extends JpaRepository<SavedPaymentMethod, Long> {
    List<SavedPaymentMethod> findByCustomerUserId(Long userId);
    // --- NEW CHECK METHOD ---
    // JPA automatically translates this method name into a SQL Query!
    boolean existsByCustomerUserIdAndTypeAndIdentifier(Long userId, String type, String identifier);
}