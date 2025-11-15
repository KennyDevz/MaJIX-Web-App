package com.app.majix.controller;

import com.app.majix.dto.AdminDTO;
import com.app.majix.dto.CustomerDTO;
import com.app.majix.dto.LoginRequestDTO;
import com.app.majix.dto.UserDTO;
import com.app.majix.entity.Admin;
import com.app.majix.entity.Customer;
import com.app.majix.entity.User;
import com.app.majix.mapper.UserMapper;
import com.app.majix.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;


    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@Valid @RequestBody LoginRequestDTO request) {
        User user = userService.login(request.getEmail(), request.getPassword());

        if (user instanceof Customer customer) {
            return ResponseEntity.ok(userMapper.toCustomerDTO(customer));
        } else if (user instanceof Admin admin) {
            return ResponseEntity.ok(userMapper.toAdminDTO(admin));
        } else {
            return ResponseEntity.ok(userMapper.toUserDTO(user));
        }
    }
}
