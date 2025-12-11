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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
//@CrossOrigin(origins = "http://localhost:3000") (removed since its in security config.java)
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
    public ResponseEntity<UserDTO> loginUser(@Valid @RequestBody LoginRequestDTO request, HttpServletRequest httpRequest) {
        User user = userService.login(request.getEmail(), request.getPassword());

        // 1. Create a Session
        HttpSession session = httpRequest.getSession(true);
        // 2. Store the user in the session (this automatically creates a JSESSIONID cookie)
        session.setAttribute("user", user);

        if (user instanceof Customer customer) {
            return ResponseEntity.ok(userMapper.toCustomerDTO(customer));
        } else if (user instanceof Admin admin) {
            return ResponseEntity.ok(userMapper.toAdminDTO(admin));
        } else {
            return ResponseEntity.ok(userMapper.toUserDTO(user));
        }
    }

    @GetMapping("/check-session")
    public ResponseEntity<UserDTO> checkSession(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false); // Don't create new if none exists
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = (User) session.getAttribute("user");
        return ResponseEntity.ok(userMapper.toDTO(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session != null) {
            session.invalidate(); // Destroys the session on the server
        }
        return ResponseEntity.ok().build();
    }
}
