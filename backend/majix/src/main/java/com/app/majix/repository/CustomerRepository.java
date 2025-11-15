package com.app.majix.repository;

import com.app.majix.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository <Customer, Long> {
    // Optional: find customer by email (useful for registration/login)
    Customer findByEmail(String email);
}
