package com.app.majix.controller;

import com.app.majix.dto.AdminDTO;
import com.app.majix.dto.CustomerDTO;
import com.app.majix.dto.LoginRequestDTO;
import com.app.majix.dto.UserDTO;
import com.app.majix.entity.Admin;
import com.app.majix.entity.Customer;
import com.app.majix.entity.User;
import com.app.majix.exception.UserNotFoundException;
import com.app.majix.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

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
    public UserDTO loginUser(@RequestBody LoginRequestDTO request) throws UserNotFoundException {
        User user = userService.login(request.getEmail(), request.getPassword());

        if(user instanceof Customer customer){
            return new CustomerDTO(
                customer.getUserId(),
                customer.getRole(),
                customer.getFirstname(),
                customer.getLastname(),
                customer.getEmail(),
                customer.getPhonenumber()
            );
        } else if (user instanceof Admin admin){
            return new AdminDTO(
                    admin.getUserId(),
                    admin.getRole(),
                    admin.getFirstname(),
                    admin.getLastname(),
                    admin.getEmail()
            );
        }else {
            return new UserDTO(
                    user.getUserId(),
                    user.getRole(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getEmail()
            );
        }
    }
}
