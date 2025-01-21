package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.*;
import com.example.PlaceZen.Repository.AppliedRepository;
import com.example.PlaceZen.Repository.HiringRepository;
import com.example.PlaceZen.Repository.StudentRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/Applied")
@CrossOrigin
public class AppliedController {
    @Autowired
    private AppliedRepository appliedRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private HiringRepository hiringRepository;

    @PostMapping("/added")
    public ResponseEntity<String> addedApplied(
            @RequestParam("Jobid") int jobid,
            @RequestParam("StudentId") int studentid,
            @RequestParam("date") String currentdate ) throws IOException {
        Applied applied = new Applied(jobid,studentid,currentdate);
        appliedRepository.save(applied);
        return ResponseEntity.ok("Added successful");

    }
    @GetMapping("/check/{Sid}/{Jid}")
    public Integer applied(@PathVariable ("Sid")Integer sid, @PathVariable ("Jid")Integer jid){
        Applied a=appliedRepository.check(sid,jid);
         if(a!=null)
             return 1;
         return  0;
    }



        @GetMapping("/search/{Jid}")
    public List<StudentRespose> nothing(@PathVariable ("Jid") Integer Jid ){

              List<StudentRespose> studentResposeList =new ArrayList<>();
              List<Applied> appList;
              appList= (List<Applied>) appliedRepository.findus(Jid);
              List<Student> stList;
              stList= (List<Student>) studentRepository.findAll();
             System.out.println(appList.size()+" "+ stList.size());
              for(int i=0;i<appList.size();i++)
              {
                  for(int j=0;j<stList.size();j++)
                  {
                      if(appList.get(i).getStudentId()==stList.get(j).getId())
                      { StudentRespose studentRespose = new StudentRespose();
                        studentRespose.setName(stList.get(j).getName());
                        studentRespose.setRoll(stList.get(j).getRoll());
                        studentRespose.setDate(appList.get(i).getDate());
                        studentRespose.setBranch(stList.get(j).getBranch());
                          studentResposeList.add(studentRespose);

                      }
                  }
              }
              return studentResposeList;

    }
    @GetMapping("/find/{Id}")
    public List<StuApplied> details(@PathVariable("Id") Integer Id){
        List<Applied> applieds = (List<Applied>) appliedRepository.findu(Id);
        System.out.println(applieds.size());
        List<StuApplied> stuAppliedList=new ArrayList<>();
        Optional<Student> student = studentRepository.findById(Id);
        List<Hiring> hirings = (List<Hiring>) hiringRepository.findAll();
        for(int i=0;i<applieds.size();i++){
            for(int j=0;j<hirings.size();j++){
                if(applieds.get(i).getJobId()==hirings.get(j).getJobId()){
                    StuApplied stuApplied = new StuApplied();
                    stuApplied.setCompanyName(hirings.get(j).getCompanyName());
                    stuApplied.setLocation(hirings.get(j).getLocation());
                    stuApplied.setRole(hirings.get(j).getRole());
                    stuApplied.setCTC(hirings.get(j).getCTC());
                    stuApplied.setDateApplied(applieds.get(i).getDate());
                    stuAppliedList.add(stuApplied);

                }
            }

        }
        return stuAppliedList;

    }

    @GetMapping("/queen/{Id}")
    private List<Hiring> hire(@PathVariable("Id") Integer Id){
        List<Hiring> Phirings = new ArrayList<>();
        List<Applied> applieds = (List<Applied>) appliedRepository.findAll();
        List<Hiring> hirings1 = (List<Hiring>) hiringRepository.findAll();
        int j=0;
        for(int i=0;i<hirings1.size();i++){


            String date1= (hirings1.get(i).getEndDate());
            LocalDate date= LocalDate.parse(date1);
            LocalDate now = LocalDate.now();
            j=0;

            System.out.println(date+" "+now );


            for( j=0; j<applieds.size() && ( date.isAfter(now) || date.isEqual(now) ) ;j++){

                System.out.println(date);

                if(applieds.get(j).getStudentId()==Id && hirings1.get(i).getJobId()==applieds.get(j).getJobId()){
                 break;
                }

            }

            if(j==applieds.size())
            {
                Hiring hiring =new Hiring();
                hiring.setCompanyName(hirings1.get(i).getCompanyName());
                hiring.setRole(hirings1.get(i).getRole());
                hiring.setLocation(hirings1.get(i).getLocation());
                hiring.setCTC(hirings1.get(i).getCTC());
                hiring.setEndDate(hirings1.get(i).getEndDate());
                hiring.setJobId(hirings1.get(i).getJobId());


                    Phirings.add(hiring);

            }

        }
        return  Phirings;

    }







}
