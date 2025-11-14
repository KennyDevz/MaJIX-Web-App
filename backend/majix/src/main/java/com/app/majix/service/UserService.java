package com.app.majix.service;

import com.app.majix.entity.User;
import com.app.majix.exception.InvalidLoginException;
import com.app.majix.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !user.getPassword().equals(password)) {
            throw new InvalidLoginException();
        }
        return user;
    }
}
