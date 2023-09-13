package com.example.sunset_snapper_server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    private Integer userId;
    private String username;
    private String password;
    private String email;

    // public Integer getUserId() {
    //     return this.userId;
    // }
    // public void setUserId(Integer userId) {
    //     this.userId = userId;
    // }

    // public String getUsername() {
    //     return this.username;
    // }
    // public void setUsername(String username) {
    //     this.username = username;
    // }

    // public String getPassword() {
    //     return this.password;
    // }
    // public void setPassword(String password) {
    //     this.password = password;
    // }

    // @Override
    // public String toString() {
    //     return "User [userId=" + userId + ", username=" + username + ", password=" + password + "]";
    // }

}
