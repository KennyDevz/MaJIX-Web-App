package com.app.majix.service;

import com.app.majix.entity.User;
import com.app.majix.repository.UserRepository;
import org.springframework.stereotype.Repository;
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

}
