package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.Resume;
import com.example.PlaceZen.Module.SignUpApprovals;
import com.example.PlaceZen.Module.Student;
import com.example.PlaceZen.Repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/resume")
public class ResumeController {
    @Autowired
    private ResumeRepository resumeRepository;

    private final String path = "D:\\SpringbootProject\\Trial2\\Resume";
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> RegisterStudent(
            @RequestParam("sid") Integer Sid,
            @RequestParam("file") MultipartFile file

    )  throws IOException {
        String fullPath = path + file.getOriginalFilename();
        file.transferTo(new File(fullPath));
        String ImageName = file.getOriginalFilename();
        String ImageType = file.getContentType();
        String ImagePath = fullPath;
        Resume resume= new Resume(Sid,ImageName,ImagePath,ImageType);
        resumeRepository.save(resume);
        return ResponseEntity.ok("Upload successful");
    }

    @GetMapping("/show/{id}")
    public ResponseEntity<byte[]> StudentImage(@PathVariable("id") int id) throws IOException {
        String fileName=resumeRepository.getFileName(id);
        System.out.println(fileName);
        Optional<Resume> imageObject=resumeRepository.findByAdminImageName(fileName);
        String fullPath = imageObject.get().getImagePath();
        byte[] image= Files.readAllBytes(new File(fullPath).toPath());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
        //return fileName;
    }
}
