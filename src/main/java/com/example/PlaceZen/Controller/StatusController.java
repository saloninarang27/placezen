package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.Status;
import com.example.PlaceZen.Repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/status")
@CrossOrigin
public class StatusController {
  @Autowired
    StatusRepository statusRepository;

    @PutMapping("/update/{jobId}")
    public ResponseEntity<String> updateStatus(@PathVariable int jobId, @RequestParam String currStatus) {
        Optional<Status> statusOptional = statusRepository.findByJobId(jobId);

        if (statusOptional.isPresent()) {
            Status status = statusOptional.get();
            status.setCurr_status(currStatus.toString());
//            System.out.println(jobId+" "+currStatus);
            System.out.println(status);
            statusRepository.save(status);
            return ResponseEntity.ok("Status updated successfully");
        } else {
            return ResponseEntity.status(404).body("Job not found");
        }
    }



    @PostMapping("/add/{jobId}")
    public ResponseEntity<String> addStatus(@PathVariable int jobId) {
        try {
            String currentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date());
            Status status = new Status(jobId,"Upcoming",currentDate);
            statusRepository.save(status);
            return ResponseEntity.ok("Added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Add: " + e.getMessage());
        }
    }






    @PutMapping("/updateStatus/{jobId}")
    public ResponseEntity<String> updateStatus2(@PathVariable int jobId) {
        Optional<Status> statusOptional = statusRepository.findByJobId(jobId);

        if (statusOptional.isPresent()) {
            Status status = statusOptional.get();
            status.setCurr_status("In Progress");
//            System.out.println(jobId+" "+currStatus);
            System.out.println(status);
            statusRepository.save(status);
            return ResponseEntity.ok("Status updated successfully");
        } else {
            return ResponseEntity.status(404).body("Job not found");
        }
    }



}
