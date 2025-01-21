package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.Round;
import com.example.PlaceZen.Module.Student;
import com.example.PlaceZen.Repository.RoundRepo;
import com.example.PlaceZen.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/round")
@CrossOrigin
public class RoundController {

    @Autowired
    RoundRepo roundRepo;
    @Autowired
    StudentRepository studentRepository;
    @PostMapping("/submit")
    public String submitRound(@RequestBody Round round) {
        try {
            // Save the round data in the database
            roundRepo.save(round);
            return "Round data submitted successfully!";
        } catch (Exception e) {
            return "Error submitting round data: " + e.getMessage();
        }
    }

    @GetMapping("/findAllByJobId/{jobId}")
    public ResponseEntity<List<Map<String, Object>>> getAllRoundsByJobId(@PathVariable Long jobId) {
        // Fetch rounds based on jobId
        List<Round> rounds = roundRepo.findByJobIdCustom(jobId);
        // Fetch all students
        List<Student> studentList = (List<Student>) studentRepository.findAll();

        List<Map<String, Object>> response = new ArrayList<>();

        for (Round round : rounds) {
            Map<String, Object> roundData = new HashMap<>();
            roundData.put("roundNum", round.getRndNumber());
            roundData.put("roundName", round.getRoundName());
            roundData.put("message", round.getDescription());
            roundData.put("date", round.getDate().toString()); // Convert to desired format

            // Extract and map roll numbers
            String[] arr = round.getRollNumList().split(",");
            List<Map<String, Object>> studentDetailsList = new ArrayList<>();

            for (String roll : arr) {
                for (Student student : studentList) {
                    if (Integer.parseInt(roll) == student.getRoll()) { // Convert roll to Integer for comparison
                        Map<String, Object> studentDetails = new HashMap<>();
                        studentDetails.put("name", student.getName());
                        studentDetails.put("branch", student.getBranch());
                        studentDetails.put("roll", student.getRoll());
                        studentDetailsList.add(studentDetails); // Add each student's details to the list
                        break; // Exit inner loop when a match is found
                    }
                }
            }

            roundData.put("stdDetails", studentDetailsList); // Add the list of student details
            response.add(roundData);
        }

        System.out.println(response);
        return ResponseEntity.ok(response);
    }


}
