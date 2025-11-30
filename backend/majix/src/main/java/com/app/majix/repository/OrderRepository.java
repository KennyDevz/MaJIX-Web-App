package com.app.majix.repository;

import com.app.majix.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
    // Useful for "Order History" later
    List<Orders> findByCustomerUserId(Long userId);
}