package com.example.sunset_snapper_server.model;

public class UserResponse {
    private String username;

    public UserResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
