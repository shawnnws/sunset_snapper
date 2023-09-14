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
    private final String INCREMENT_LIKE_SQL = "UPDATE photos SET likes = likes + 1 WHERE photo_id = ?";

    // Getting photos based on specific country and city
    private final String GET_PHOTOS_BY_COUNTRY_AND_CITY_SQL = "SELECT username, photo, details, likes FROM photos WHERE country = ? AND city = ?";
    private final String GET_PHOTOS_BY_CITY_SQL = "SELECT photo_id, username, photo, details, likes FROM photos WHERE city = ?";

    // Getting photos based on username
    private final String GET_PHOTOS_BY_USER_SQL = "SELECT photo_id, photo, country, city, details, likes FROM photos where username = ?";


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
    public Boolean incrementLike(Integer photoId) {
        int updated = 0;
        updated = template.update(INCREMENT_LIKE_SQL, photoId);

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

    public List<Photo> getPhotosByCity(String city) {
        List<Photo> photoList = new ArrayList<Photo>();
        photoList = template.query(GET_PHOTOS_BY_CITY_SQL, 
            BeanPropertyRowMapper.newInstance(Photo.class), city);

        System.out.println(photoList);
        return photoList;
    }

    public List<Photo> getPhotosByUser(String username) {
        List<Photo> userPhotoList = new ArrayList<Photo>();
        userPhotoList = template.query(GET_PHOTOS_BY_USER_SQL, 
            BeanPropertyRowMapper.newInstance(Photo.class), username);

        System.out.println(userPhotoList);
        return userPhotoList;
    }
}
