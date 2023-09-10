package com.example.sunset_snapper_server.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.sunset_snapper_server.model.Photo;
import com.example.sunset_snapper_server.model.User;
import com.example.sunset_snapper_server.repository.PhotoRepository;
import com.example.sunset_snapper_server.repository.S3Repository;

@Service
public class PhotoService {
    
    @Autowired
    private S3Repository s3Repo;

    @Autowired
    private PhotoRepository photoRepo;

    // Method to upload photo to s3 with the form data received from client.
    public String uploadPhotoS3(String username, MultipartFile photo, String country, String city, String details) throws IOException {
        String url = s3Repo.upload(photo);
        Photo photoToUpload = new Photo();
        photoToUpload.setUsername(username);
        photoToUpload.setPhoto(url);
        photoToUpload.setCountry(country);
        photoToUpload.setCity(city);
        photoToUpload.setDetails(details);
        return photoToUpload.getUsername();
    }

    // List of service methods for SQL PhotoRepo functions

    public Boolean uploadPhotoSQL(Photo photo) {
        return photoRepo.uploadPhoto(photo);
    }

    public Boolean incrementLike(String photoUrl) {
        return photoRepo.incrementLike(photoUrl);
    }

    public List<Photo> getPhotosByCountryCity(String country, String city) {
        return photoRepo.getPhotosByCountryCity(country, city);
    }

    public Boolean insertNewUser(User user) {
        return photoRepo.insertNewUser(user);
    }

    public List<Photo> getPhotosByUser(String username) {
        return photoRepo.getPhotosByUser(username);
    }
}
