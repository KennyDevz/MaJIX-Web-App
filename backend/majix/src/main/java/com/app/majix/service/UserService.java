package com.app.majix.service;

import com.app.majix.entity.User;
import com.app.majix.exception.InvalidLoginException;
import com.app.majix.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Add this

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User createUser(User user){
        // Hash the password before saving!
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        // Use matches() to compare the raw password with the hashed one in DB
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidLoginException();
        }
        return user;
    }
}
