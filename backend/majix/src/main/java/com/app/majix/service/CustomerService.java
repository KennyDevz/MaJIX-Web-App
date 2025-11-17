package com.app.majix.service;

import com.app.majix.entity.Cart;
import com.app.majix.entity.Customer;
import com.app.majix.repository.CartRepository;
import com.app.majix.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CartService cartService;

    public CustomerService(CustomerRepository customerRepository, CartService cartService){
        this.customerRepository = customerRepository;
        this.cartService = cartService;
    }

    @Transactional //Create cart for every user. If either fail, undo db changes or modifications.
    public Customer createCustomer(Customer customer){
        //save customer first
        Customer newCustomer = customerRepository.save(customer);

        //automatically create cart for customer after
        Cart cart = cartService.createCustomerCart(newCustomer);
        newCustomer.setCart(cart);

        return newCustomer;
    }

    // Optional: find customer by email
    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public Cart getUsersCart(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return customer.getCart();
    }
}
