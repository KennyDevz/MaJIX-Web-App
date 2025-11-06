package com.app.majix.repository;

import com.app.majix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByLastname(String lastname);
    Optional<User> findByEmail(String email);
}
