package com.example.sunset_snapper_server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.sunset_snapper_server.model.User;

@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String GET_USER_BY_ID_SQL = "select username from users where user_id = ?";

    private final String GET_USER_BY_USERNAME_SQL = "select username from users where username = ?";

    private final String CREATE_USER_SQL = "insert into users (username) values (?)";

    public String getUserByUserId(Integer userId) {
        try {
            String user = jdbcTemplate.queryForObject(GET_USER_BY_ID_SQL, String.class, userId);
        
            System.out.println("Received username: " + user);
            return user;
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }

    }

    public String getUserByUsername(String username) {
        try {
            String user = jdbcTemplate.queryForObject(GET_USER_BY_USERNAME_SQL, String.class, username);
        
            System.out.println("Received user: " + user);
            return user;
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }

    }

    public Boolean createUser(String username) {
        int created = 0;
        created = jdbcTemplate.update(CREATE_USER_SQL, username);
            // user.getPassword());

        if (created > 0)
            return true;
        else
            return false;
    }
}

