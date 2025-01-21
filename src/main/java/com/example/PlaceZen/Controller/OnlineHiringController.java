package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.OnlineHiring;
import com.example.PlaceZen.Repository.OnlineHiringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AddOn")
@CrossOrigin
public class OnlineHiringController {
    @Autowired
    private OnlineHiringRepository onlineHiringRepository;

    @PostMapping("/Online")
    public ResponseEntity<String> Onhiring(
            @RequestParam("Company") String cname,
            @RequestParam("Role") String role,
            @RequestParam("Apply") String alink
    ){
        OnlineHiring onlineHiring = new OnlineHiring(cname,role,alink);
        onlineHiringRepository.save(onlineHiring);
        return ResponseEntity.ok("Added successful");


    }
    @GetMapping("/alll")
    public List<OnlineHiring> allHiring(){
        return (List<OnlineHiring>) onlineHiringRepository.findAll();
    }
}
