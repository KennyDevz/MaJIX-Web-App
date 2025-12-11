package com.app.majix.controller;

import com.app.majix.dto.CartDTO;
import com.app.majix.dto.CustomerDTO;
import com.app.majix.dto.CustomerRegistrationRequest;
import com.app.majix.entity.Cart;
import com.app.majix.entity.Customer;
import com.app.majix.entity.User;
import com.app.majix.mapper.UserMapper;
import com.app.majix.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

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
    public ResponseEntity<?> createCustomer(@Valid @RequestBody CustomerRegistrationRequest request){

        // 1. Check for Duplicate Email
        if (customerService.findByEmail(request.getEmail()) != null) {
            // Return JSON format { "email": "message" } to match validation errors
            return ResponseEntity
                    .badRequest()
                    .body(Collections.singletonMap("email", "Email is already registered"));
        }

        // 2. Map DTO to Entity
        Customer newCustomerEntity = new Customer();
        newCustomerEntity.setFirstname(request.getFirstname());
        newCustomerEntity.setLastname(request.getLastname());
        newCustomerEntity.setEmail(request.getEmail());
        newCustomerEntity.setPassword(request.getPassword());
        newCustomerEntity.setPhonenumber(request.getPhonenumber());

        // 3. Save
        Customer savedCustomer = customerService.createCustomer(newCustomerEntity);

        // 4. Return DTO
        CustomerDTO customerDTO = userMapper.toCustomerDTO(savedCustomer);
        return ResponseEntity.ok(customerDTO);
    }

    @GetMapping("/{customerId}/cart")
    public ResponseEntity<CartDTO> getUsersCart(@PathVariable Long customerId) {
        Cart cart = customerService.getUsersCart(customerId);
        return ResponseEntity.ok(userMapper.toCartDTO(cart));
    }
}
