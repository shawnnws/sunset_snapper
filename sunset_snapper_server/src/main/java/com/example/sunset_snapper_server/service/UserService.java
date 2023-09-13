package com.example.sunset_snapper_server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sunset_snapper_server.model.User;
import com.example.sunset_snapper_server.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepo;

    public User getUserByUserId(Integer userId) {
        return userRepo.getUserByUserId(userId);
    }

    public User getUserByUsername(String username) {
        return userRepo.getUserByUsername(username);
    }

    public Boolean createUser(User user) {
        return userRepo.createUser(user);
    }
}
