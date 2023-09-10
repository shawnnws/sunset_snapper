package com.example.sunset_snapper_server.controller;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.sunset_snapper_server.service.PhotoService;

@RestController
@CrossOrigin(origins="*")
public class PhotoController {
    
    @Autowired
    private PhotoService photoService;

    // Controller method to upload photo to s3.
    // Is it necessary to include other details or just photo?
    @PostMapping(path="/uploadPhotoS3", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadPhoto(
        @RequestParam("username") String username,
        @RequestParam("photo") MultipartFile photo,
        @RequestParam("country") String country,
        @RequestParam("city") String city,
        @RequestParam("details") String details
    ) {
        System.out.println("Received username: " + username);
        System.out.println("Received photo: " + photo.getOriginalFilename());
        System.out.println("Received country: " + country);
        System.out.println("Received city: " + city);
        System.out.println("Received details: " + details);

        try {
            String photoUsername = photoService.uploadPhotoS3(username, photo, country, city, details);
            String jsonResponse = String.format("{\"photoUsername\": \"%s\"}", photoUsername);
            return ResponseEntity.status(HttpStatus.SC_CREATED).body(jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
			String jsonResponse = String.format("{\"error\": \"%s\"}", e.getMessage());
			return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(jsonResponse);
        }
    }
}
