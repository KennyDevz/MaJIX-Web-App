package com.app.majix.controller;

import com.app.majix.dto.AdminDTO;
import com.app.majix.dto.CustomerDTO;
import com.app.majix.dto.LoginRequestDTO;
import com.app.majix.dto.UserDTO;
import com.app.majix.entity.Admin;
import com.app.majix.entity.Customer;
import com.app.majix.entity.User;
import com.app.majix.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@Valid @RequestBody LoginRequestDTO request) {
        User user = userService.login(request.getEmail(), request.getPassword());

        if(user instanceof Customer customer){
            CustomerDTO customerDTO = new CustomerDTO(
                customer.getUserId(),
                customer.getRole(),
                customer.getFirstname(),
                customer.getLastname(),
                customer.getEmail(),
                customer.getPhonenumber()
            );
            return ResponseEntity.ok(customerDTO);
        } else if (user instanceof Admin admin){
            AdminDTO adminDTO = new  AdminDTO(
                    admin.getUserId(),
                    admin.getRole(),
                    admin.getFirstname(),
                    admin.getLastname(),
                    admin.getEmail()
            );
            return ResponseEntity.ok(adminDTO);
        }else {
            UserDTO userDTO = new UserDTO(
                    user.getUserId(),
                    user.getRole(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getEmail()
            );
            return ResponseEntity.ok(userDTO);
        }
    }
}
