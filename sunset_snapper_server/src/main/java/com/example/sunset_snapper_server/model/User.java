package com.example.sunset_snapper_server.model;

public class User {
    
    private Integer userId;
    private String username;


    public Integer getUserId() {
        return this.userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return this.username;
    }
    public void setUsername(String username) {
        this.username = username;
    }


    @Override
    public String toString() {
        return "User [userId=" + userId + ", username=" + username + "]";
    }

}
