package com.example.sunset_snapper_server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sunset_snapper_server.model.User;
import com.example.sunset_snapper_server.service.TokenService;
import com.example.sunset_snapper_server.service.UserService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping
public class AuthController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private TokenService tokenService;

    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        
        if (userService.getUserByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists...");
        }

        // Hash password

        userService.createUser(user);
        return ResponseEntity.ok("User registered successfully...");
    }

    // @PostMapping("/login")
    // public ResponseEntity<String> login(Authentication auth) {
    //     String token = tokenService.generateToken(auth);
    //     return ResponseEntity.ofNullable(token);
    // }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        return ResponseEntity.ok("");
    }
}
