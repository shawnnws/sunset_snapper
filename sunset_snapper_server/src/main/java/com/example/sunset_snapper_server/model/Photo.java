package com.example.sunset_snapper_server.model;

public class Photo {

    private Integer photoId;
    private String username;
    private String photo;
    private String country;
    private String city;
    private String details;
    private Integer likes;

    public Integer getPhotoId() {
        return this.photoId;
    }
    public void setPhotoId(Integer photoId) {
        this.photoId = photoId;
    }

    public String getUsername() {
        return this.username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoto() {
        return this.photo;
    }
    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getCountry() {
        return this.country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return this.city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    public String getDetails() {
        return this.details;
    }
    public void setDetails(String details) {
        this.details = details;
    }

    public Integer getLikes() {
        return this.likes;
    }
    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    @Override
    public String toString() {
        return "Photo [photoId=" + photoId + ", username=" + username + ", photo=" + photo + ", country=" + country
                + ", city=" + city + ", details=" + details + ", likes=" + likes + "]";
    }

}
