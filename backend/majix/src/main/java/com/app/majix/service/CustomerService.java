package com.app.majix.service;

import com.app.majix.entity.Cart;
import com.app.majix.entity.Customer;
import com.app.majix.repository.CartRepository;
import com.app.majix.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CartService cartService;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, CartService cartService){
        this.customerRepository = customerRepository;
        this.cartService = cartService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional //Create cart for every user. If either fail, undo db changes or modifications.
    public Customer createCustomer(Customer customer){
        // 1. Just save the customer.
        // We DO NOT create a cart here anymore.
        // The CartService will automatically create an 'ACTIVE' cart
        // the moment the user adds their first item.
        String encodedPassword = passwordEncoder.encode(customer.getPassword());// Hash the password before saving!
        customer.setPassword(encodedPassword);
        return customerRepository.save(customer);
    }

    // Optional: find customer by email
    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public Cart getUsersCart(Long customerId) {
        // 2. Use the CartService to find the ACTIVE cart
        return cartService.getActiveCart(customerId);
    }
}
