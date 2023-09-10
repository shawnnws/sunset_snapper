package com.example.sunset_snapper_server.repository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
// import com.amazonaws.services.s3.model.PutObjectResult;

@Repository
public class S3Repository {
    
    @Autowired
    private AmazonS3 s3;

    @Value("${s3.bucket.bucketname}")
	private String bucketName;
    

    // Upload image to s3
    public String upload(MultipartFile imageFile) throws IOException {
        
        try (InputStream is = new ByteArrayInputStream(imageFile.getBytes())) {
            String fileName = imageFile.getName();
            String contentType = getContentType(fileName);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = is.read(buffer)) > 0) {
                baos.write(buffer, 0, len);
            }
            byte[] bytes = baos.toByteArray();
            InputStream inputStream = new ByteArrayInputStream(bytes);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            metadata.setContentLength(bytes.length);

            PutObjectRequest putReq = new PutObjectRequest(bucketName, fileName, inputStream, metadata);
            putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);
            // PutObjectResult putObjectResult = s3.putObject(putReq);

            String url = s3.getUrl(bucketName, fileName).toString();
            return url;
        }
    }

    // Method to get content type of image file
    private String getContentType(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        switch(extension) {
            case "png":
                return "image/png";
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            default:
                return "application/octet-stream";
        }
    }
}
