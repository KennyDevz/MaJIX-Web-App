package com.app.majix.controller;

import com.app.majix.dto.CustomerDTO;
import com.app.majix.entity.Customer;
import com.app.majix.entity.User;
import com.app.majix.mapper.UserMapper;
import com.app.majix.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    private final CustomerService customerService;
    private final UserMapper userMapper;

    public CustomerController(CustomerService customerService, UserMapper userMapper){
        this.customerService = customerService;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer){
        // Optional: check if email already exists
        if (customerService.findByEmail(customer.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        Customer newCustomer = customerService.createCustomer(customer);

        //convert using the mapper
        CustomerDTO customerDTO = userMapper.toCustomerDTO(newCustomer);
        return ResponseEntity.ok(customerDTO);
    }
}
