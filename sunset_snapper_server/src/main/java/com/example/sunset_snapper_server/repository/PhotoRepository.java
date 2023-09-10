package com.example.sunset_snapper_server.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.sunset_snapper_server.model.Photo;
import com.example.sunset_snapper_server.model.User;

@Repository
public class PhotoRepository {
    
    @Autowired
    private JdbcTemplate template;

    // Insert new photo details after uploading to s3 and getting url back
    private final String UPLOAD_SQL = "INSERT INTO photos (username, photo, country, city, details, likes) VALUES (?, ?, ?, ?, ?, 1)";

    // Updating like count of photo 
    private final String INCREMENT_LIKE_SQL = "UPDATE photos SET likes = likes + 1 WHERE photo = ?";

    // Getting photos based on specific country and city
    private final String GET_PHOTOS_BY_COUNTRY_AND_CITY_SQL = "SELECT username, photo, details, likes FROM photos WHERE country = ? AND city = ?";


    // TO WORK ON: USER DATABASE
    private final String INSERT_NEW_USER_SQL = "insert into users (username, password) values (?, ?)";

    private final String GET_PHOTOS_BY_USER_SQL = "SELECT photo, country, city, details, likes FROM photos where username = ?";


    public Boolean uploadPhoto(Photo photo) {
        int saved = 0;
        saved = template.update(UPLOAD_SQL,
            photo.getUsername(),
            photo.getPhoto(),
            photo.getCountry(),
            photo.getCity(),
            photo.getDetails());

        if (saved > 0)
            return true; 
        else
            return false;
    }

    // Check if argument should be photoUrl.
    public Boolean incrementLike(String photoUrl) {
        int updated = 0;
        updated = template.update(INCREMENT_LIKE_SQL, photoUrl);

        if (updated > 0)
            return true;
        else
            return false;
    }

    public List<Photo> getPhotosByCountryCity(String country, String city) {
        List<Photo> photoList = new ArrayList<Photo>();
        photoList = template.query(GET_PHOTOS_BY_COUNTRY_AND_CITY_SQL, 
            BeanPropertyRowMapper.newInstance(Photo.class), country, city);

        System.out.println(photoList);
        return photoList;
    }

    public Boolean insertNewUser(User user) {
        int saved = 0;
        saved = template.update(INSERT_NEW_USER_SQL,
            user.getUsername(),
            user.getPassword());

        if (saved > 0)
            return true;
        else
            return false;
    }

    public List<Photo> getPhotosByUser(String username) {
        List<Photo> userPhotoList = new ArrayList<Photo>();
        userPhotoList = template.query(GET_PHOTOS_BY_USER_SQL, 
            BeanPropertyRowMapper.newInstance(Photo.class), username);

        System.out.println(userPhotoList);
        return userPhotoList;
    }
}
