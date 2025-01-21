package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.Alumnii;
import com.example.PlaceZen.Module.OnlineHiring;
import com.example.PlaceZen.Module.Student;
import com.example.PlaceZen.Repository.AlumniRepository;
import com.example.PlaceZen.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/alumini")
public class AluminiController {
    @Autowired
    private AlumniRepository alumniRepository;
    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/add")
    public ResponseEntity<String> Addu(
            @RequestParam("SRoll") Integer Sroll,
            @RequestParam("SName") String Name,
            @RequestParam("Session") Integer Session,
            @RequestParam("Jobs") String jobs,
            @RequestParam("Description") String Description
    ){
        Alumnii alumnii=new Alumnii(Sroll,jobs,Name,Session,Description);
        alumniRepository.save(alumnii);
        return ResponseEntity.ok("Added successful");


    }

    @GetMapping("/find")
    public List<Alumnii> alll()
    {
        List<Alumnii> alumniis=new ArrayList<>();
        List<Student> students= (List<Student>) studentRepository.findAll();
        List<Alumnii> alumniiList= (List<Alumnii>) alumniRepository.findAll();

        for (int i=0;i<students.size();i++)
        {
            if(students.get(i).getSSession()<=2020)
            {
                StringBuilder Desription= new StringBuilder();
                StringBuilder job= new StringBuilder();

                for (int j=0;j<alumniiList.size();j++)
                {
                    if(students.get(i).getRoll()==alumniiList.get(j).getRoll())
                    {
                        Desription.append(students.get(i).getSkills());
                        job.append(alumniiList.get(j).getJob());
                        break;
                    }
                }
                Alumnii alumnii=new Alumnii(students.get(i).getRoll(), job.toString(),students.get(i).getName(),students.get(i).getSSession(), Desription.toString(),students.get(i).getGender());
                alumniis.add(alumnii);
            }

        }
        return alumniis;


    }
    @GetMapping("/asl/{roll}")
    public Student fiff(@PathVariable("roll") Integer roll)
    {
        return studentRepository.Stud(roll);
    }
    @GetMapping("/asls/{roll}")
    public Alumnii fifif(@PathVariable("roll") Integer roll)
    {
        List<Alumnii>alumniiList= (List<Alumnii>) alumniRepository.findAll();
        String Desription= "";
        String job= "";

        for (int j=0;j<alumniiList.size();j++)
        {
            if(roll==alumniiList.get(j).getRoll())
            {   Desription+=alumniiList.get(j).getDescription();
                job+=alumniiList.get(j).getJob();
//                Desription.append(alumniiList.get(j).getDescription());
//                job.append(alumniiList.get(j).getJob());
                break;
            }
        }
        Alumnii alumnii=new Alumnii(job,Desription);
        return alumnii;
    }






}
