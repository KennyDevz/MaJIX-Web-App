package com.app.majix.repository;

import com.app.majix.entity.Cart;
import com.app.majix.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CartRepository extends JpaRepository <Cart, Long> {

    // Optional: find cart by customer
    Cart findByCustomer(Customer customer);

    Optional<Cart> findByCustomerUserIdAndStatus(Long userId, String status);
}
