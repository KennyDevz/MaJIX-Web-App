package com.app.majix.repository;

import com.app.majix.entity.Returns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReturnRepository extends JpaRepository<Returns, Long> {
    List<Returns> findByCustomerUserId(Long userId);
}