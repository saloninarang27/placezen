package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.SignUpApprovals;
import com.example.PlaceZen.Module.Student;
import com.example.PlaceZen.Repository.SignupApprovRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/signApprov")
@CrossOrigin
public class SignUpApprovalsController {

    @Autowired
    private SignupApprovRepo signupApprovRepo;
    private final String path = "../../Images";
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> RegisterStudent(
            @RequestParam("roll") Integer Roll,
            @RequestParam("name") String Name,
            @RequestParam("semester") Integer Semester,
            @RequestParam("branch") String Branch,
            @RequestParam("dob") String DOB,
            @RequestParam("mobile") String Mobile,
            @RequestParam("gender") String Gender,
            @RequestParam("email") String Email,
            @RequestParam("linkedin") String Linkedin,
            @RequestParam("github") String Github,
            @RequestParam("cgpa") Float CGPA,
            @RequestParam("backlog") Integer Backlog,
            @RequestParam("skills") String Skills,
            @RequestParam("interest") String Interest,
            @RequestParam("portfolio") String Portfolio,
            @RequestParam("experience") String Experience,
            @RequestParam("file") MultipartFile file,
            @RequestParam("password") String Password,
            @RequestParam("session") Integer SSession
    )  throws IOException {
        String fullPath = path + file.getOriginalFilename();
        file.transferTo(new File(fullPath));
        String ImageName = file.getOriginalFilename();
        String ImageType = file.getContentType();
        String ImagePath = fullPath;
        SignUpApprovals student = new SignUpApprovals(Roll,Name,Semester,Branch,DOB,Mobile,Gender,Email,Linkedin,Github,CGPA,Backlog,Skills,Interest,Portfolio,Experience,ImageName,ImagePath,ImageType,Password,SSession);
        signupApprovRepo.save(student);
        return ResponseEntity.ok("Upload successful");
    }
    @GetMapping("/all")
    public List<SignUpApprovals> all()
    {
        return (List<SignUpApprovals>) signupApprovRepo.findAll();
    }
    @GetMapping("/delete/{Id}")
    public String remove(@PathVariable("Id") Integer Id){
        signupApprovRepo.deleteById(Id);
        return "deleted";


    }
}
