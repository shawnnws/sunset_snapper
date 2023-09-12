package com.example.sunset_snapper_server.controller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.sunset_snapper_server.model.Photo;
import com.example.sunset_snapper_server.service.PhotoService;

@RestController
@CrossOrigin(origins="*")
public class PhotoController {
    
    @Autowired
    private PhotoService photoService;



    // Controller method to upload photo to s3.
    // Is it necessary to include other details or just photo?
    @PostMapping(path="/uploadPhoto", consumes = "multipart/form-data")
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
            // Upload to s3
            String photoUrl = photoService.uploadPhotoS3(username, photo, country, city, details);

            // Upload to SQL
            Photo photoToUpload = new Photo();
                photoToUpload.setUsername(username);
                photoToUpload.setPhoto(photoUrl);
                photoToUpload.setCountry(country);
                photoToUpload.setCity(city);
                photoToUpload.setDetails(details);
            photoService.uploadPhotoSQL(photoToUpload);

            String jsonResponse = String.format("{\"photoUsername\": \"%s\"}", photoUrl);
            return ResponseEntity.status(HttpStatus.SC_CREATED).body(jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
			String jsonResponse = String.format("{\"error\": \"%s\"}", e.getMessage());
			return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(jsonResponse);
        }
    }

    @GetMapping(path = "/city/{city}", produces = "application/json")
    public ResponseEntity<List<Photo>> getTopTags(@PathVariable String city) {

        System.out.println("Received request for city: " + city);

        List<Photo> photoList = photoService.getPhotosByCity(city);
		System.out.println("Returning photoList:");

		for (Photo photo: photoList) {
			System.out.println("Received photo: " + photo.getPhoto());
		}

        return ResponseEntity.ok(photoList);
    }

    @PostMapping(path = "/incrementLike/{photoId}", produces = "application/json")
    public ResponseEntity<Boolean> incrementLike(@PathVariable Integer photoId) {

        System.out.println("Received request for incrementing like: " + photoId);

        Boolean success = photoService.incrementLike(photoId);
        System.out.println("Increment like: " + success);

        return ResponseEntity.ok(success);
    }

    @GetMapping(path = "/username/{username}", produces = "application/json")
    public ResponseEntity<List<Photo>> getUserPhotos(@PathVariable String username) {

        System.out.println("Received request for username: " + username);

        List<Photo> photoList = photoService.getPhotosByUser(username);
        System.out.println("Returning photoList:");

        for (Photo photo: photoList) {
            System.out.println("Received photo: " + photo.getPhoto());
        }

        return ResponseEntity.ok(photoList);
    }
}
