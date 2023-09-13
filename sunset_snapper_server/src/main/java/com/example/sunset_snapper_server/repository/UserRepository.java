package com.example.sunset_snapper_server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.sunset_snapper_server.model.User;

@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String GET_USER_BY_ID_SQL = "select user_id, username from users where user_id = ?";

    private final String GET_USER_BY_USERNAME_SQL = "select user_id, username from users where username = ?";

    private final String CREATE_USER_SQL = "insert into users (username, password) values (?, ?)";

    public User getUserByUserId(Integer id) {
        User user = new User();
        user = jdbcTemplate.queryForObject(GET_USER_BY_ID_SQL, 
            BeanPropertyRowMapper.newInstance(User.class), id);
        
        System.out.println("Received user: " + user);
        return user;
    }

    public User getUserByUsername(String username) {
        User user = new User();
        user = jdbcTemplate.queryForObject(GET_USER_BY_USERNAME_SQL, 
            BeanPropertyRowMapper.newInstance(User.class), username);
        
        System.out.println("Received user: " + user);
        return user;
    }

    public Boolean createUser(User user) {
        int created = 0;
        created = jdbcTemplate.update(CREATE_USER_SQL,
            user.getUsername(),
            user.getPassword());

        if (created > 0)
            return true;
        else
            return false;
    }
}

