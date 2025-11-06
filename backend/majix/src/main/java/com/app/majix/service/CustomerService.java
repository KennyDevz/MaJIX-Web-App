package com.app.majix.service;

import com.app.majix.entity.Customer;
import com.app.majix.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }
}
