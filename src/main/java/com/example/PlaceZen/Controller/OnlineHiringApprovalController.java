package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.OnlineHiringApproval;
import com.example.PlaceZen.Repository.OnlineHiringApprovalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/OnlineApproval")
@CrossOrigin
public class OnlineHiringApprovalController {
    @Autowired
    private OnlineHiringApprovalRepository onlineHiringApprovalRepository;



    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(value = "/adds")
    public ResponseEntity<String> AddOnlineHirings(
            @RequestParam("Company") String companyName,
            @RequestParam("Role") String role,
            @RequestParam("Apply") String link,
            @RequestParam("SId") Integer sid

    )  throws IOException {
        OnlineHiringApproval approval = new OnlineHiringApproval(companyName,role,link,sid);
        onlineHiringApprovalRepository.save(approval);
        return ResponseEntity.ok("Upload successful");
    }

    @GetMapping("/allApprovals")
    public List<OnlineHiringApproval> AllOnlineApproval(){
        return (List<OnlineHiringApproval>) onlineHiringApprovalRepository.findAll();
    }
    @GetMapping("/getby/{id}")
    public Optional<OnlineHiringApproval> getby(@PathVariable("id") int id){
        return  onlineHiringApprovalRepository.findById(id);
    }
    @GetMapping("/delete/{Id}")
    public String remove(@PathVariable("Id") Integer Id){
        onlineHiringApprovalRepository.deleteById(Id);
        return "deleted";


    }

}
