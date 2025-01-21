package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.Coordinators;
import com.example.PlaceZen.Repository.CoordinatorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/TP")
@CrossOrigin

public class CoordinatorsController {
    @Autowired
    private CoordinatorsRepository coordinatorsRepository;

    @PostMapping("/cell")
    public ResponseEntity<String> coordinate(
            @RequestParam("Name") String name,
            @RequestParam("Branch") String branch,
            @RequestParam("Semester") String semester,
            @RequestParam("Contact") String contact,
            @RequestParam("Email") String email,
            @RequestParam("UserName") String username,
            @RequestParam("Password") String password
    ){
        Coordinators coordinators = new Coordinators(name,branch,semester,contact,email,username,password);
        coordinatorsRepository.save(coordinators);
        return ResponseEntity.ok("Added successful");
    }
    @GetMapping("/total")
    public List<Coordinators> allCoordinators(){
        return (List<Coordinators>) coordinatorsRepository.findAll();
    }
}
