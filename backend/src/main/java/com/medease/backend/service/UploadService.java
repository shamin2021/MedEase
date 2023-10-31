package com.medease.backend.service;

import com.medease.backend.Exception.CustomException;
import com.medease.backend.entity.Patient;
import com.medease.backend.entity.Prescription;
import com.medease.backend.entity.User;
import com.medease.backend.entity.UserImage;
import com.medease.backend.repository.PrescriptionRepository;
import com.medease.backend.repository.UserImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UploadService {

    private final UserImageRepository userImageRepository;
    private final PrescriptionRepository prescriptionRepository;

    public void uploadImage(MultipartFile image, User user) {

        String rootDirectory = System.getProperty("user.dir");
        // File.separator used to get the correct path for whatever unix or Windows environment
        String imageUploadPath = rootDirectory + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "uploads" + File.separator + "images";
        System.out.println(imageUploadPath);

        try {
            if (!image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                String fileName = generateUniqueFileName(image.getOriginalFilename());
                System.out.println(fileName);
                Path filePath = Paths.get(imageUploadPath, fileName);
                Files.write(filePath, imageBytes);

                // to save the image in the model new UserImage instance is created
                UserImage userImage = new UserImage();
                userImage.setImage(imageBytes);
                userImage.setUserId(user);

                userImageRepository.save(userImage);
            }
            else{
                throw new CustomException("No Images Selected");
            }

        } catch (Exception e) {
            throw new CustomException("Image Uploading Failed");
        }
    }

    private String generateUniqueFileName(String originalFilename) {
        String uniqueFileName = UUID.randomUUID().toString();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return uniqueFileName + fileExtension;
    }

    // to return the profile image as base64 image
    @Transactional
    public String retrieveProfileImage(Integer userID) {
        Optional<UserImage> userImage = userImageRepository.findByUserId(userID);

        if(userImage.isPresent()){
            byte[] image = userImage.get().getImage();
            return Base64.getEncoder().encodeToString(image);
        }
        else{
            return null;
        }
    }

    @Transactional
    public void editImage(MultipartFile image, User user) throws IOException {

        String rootDirectory = System.getProperty("user.dir");
        // File.separator used to get the correct path for whatever unix or Windows environment
        String imageUploadPath = rootDirectory + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "uploads" + File.separator + "images";
        System.out.println(imageUploadPath);


        try {
            if (!image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                String fileName = generateUniqueFileName(image.getOriginalFilename());
                System.out.println(fileName);
                Path filePath = Paths.get(imageUploadPath, fileName);
                Files.write(filePath, imageBytes);

                var userId = user.getId();

                Optional<UserImage> userImage = userImageRepository.findByUserId(userId);

                if(userImage.isPresent()) {
                    var existingImage = userImage.get();
                    existingImage.setImage(imageBytes);
                    userImageRepository.save(existingImage);
                }
                else{
                    UserImage newUserImage = new UserImage();
                    newUserImage.setImage(imageBytes);
                    newUserImage.setUserId(user);
                    userImageRepository.save(newUserImage);
                }

            }

        } catch (Exception e) {
            throw e;
        }
    }

    //upload prescription
    public void uploadPrescription(MultipartFile image, User user) {

        String rootDirectory = System.getProperty("user.dir");
        // File.separator used to get the correct path for whatever unix or Windows environment
        String imageUploadPath = rootDirectory + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "uploads" + File.separator + "prescriptions";
        System.out.println(imageUploadPath);

        try {
            if (!image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                String fileName = generateUniqueFileName(image.getOriginalFilename());
                System.out.println(fileName);
                Path filePath = Paths.get(imageUploadPath, fileName);
                Files.write(filePath, imageBytes);

                // to save the image in the model new UserImage instance is created
                Prescription prescription = new Prescription();
                prescription.setPrescription(imageBytes);
                prescription.setUser(user);

                prescriptionRepository.save(prescription);
            }
            else{
                throw new CustomException("No Prescriptions Selected");
            }

        } catch (Exception e) {
            throw new CustomException("Prescription Uploading Failed");
        }
    }

    // to return the prescriptions in base64 image
    @Transactional
    public List<String> retrievePrescriptions(Integer userID) {
        var prescriptions = prescriptionRepository.findPrescriptionByUser(userID);
        List<String> prescriptionList = new ArrayList<>();

        for(Optional<Prescription> prescription : prescriptions){
            if(prescription.isPresent()){
                byte[] image = prescription.get().getPrescription();
                prescriptionList.add(Base64.getEncoder().encodeToString(image));
            }
        }

        return  prescriptionList;
    }

}
