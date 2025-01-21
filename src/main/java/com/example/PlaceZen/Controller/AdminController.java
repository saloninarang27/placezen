package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.Admin;
import com.example.PlaceZen.Module.Student;
import com.example.PlaceZen.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/Admin")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;


    @GetMapping("/getId/{username}/{password}")
    public int getProfileId(@PathVariable("username") String username, @PathVariable("password") String password) {
        try {
            Integer result = adminRepository.getbyUsername(username, password);

            // Check for null and handle accordingly
            if (result != null) {
                return result.intValue();
            } else {
                // Handle the case where result is null (e.g., return a default value)
                return -1;
            }
        } catch (Exception e) {
            // Handle other exceptions, log the error, or return a specific value
            e.printStackTrace();
            return -1;
        }
    }




    @GetMapping("/getAdmin/{Id}")
    public Optional<Admin> getprofile(@PathVariable("Id") Integer Id)
    {
        return adminRepository.findById(Id);
    }

}
