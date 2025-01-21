package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.*;
import com.example.PlaceZen.Repository.HiringRepository;
import com.example.PlaceZen.Repository.ResultRepository;
import com.example.PlaceZen.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/result")

public class ResultController {
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private HiringRepository hiringRepository;
    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addResults(@RequestBody List<Result> results) {
        try {
            resultRepository.saveAll(results);
            return ResponseEntity.ok("Added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred while saving results");
        }
    }
    @GetMapping("/allC")
    public Set<String> allCompany(){

        List<Result> results= (List<Result>) resultRepository.findAll();
        Set<String> set = new HashSet<String>();
        for(int i=0;i<results.size();i++)
        {
            set.add(results.get(i).getCName());
        }
        return set;
    }

    @GetMapping("/allC2")
    public List<Map<String, Object>> allCompay() {
        List<Result> results = (List<Result>) resultRepository.findAll();
        List<Map<String, Object>> companyList = new ArrayList<>();
        Set<String> seenCompanies = new HashSet<>();

        for (Result result : results) {
            String companyName = result.getCName();
            int id = result.getJId();

            // Create a unique key based on company name and ID to check for duplicates
            String key = companyName + "-" + id;

            if (!seenCompanies.contains(key)) {
                // Add to the set to avoid duplicates
                seenCompanies.add(key);

                // Create a new map for the unique company
                Map<String, Object> companyMap = new HashMap<>();
                companyMap.put("companyName", companyName);
                companyMap.put("id", id);

                // Add the map to the list
                companyList.add(companyMap);
            }
        }

        return companyList;
    }
    @GetMapping("/StResult")
    public List<Result> findallresult(){
        return (List<Result>) resultRepository.findAll();
    }

    @GetMapping("/verify/{Sid}/{Jid}")
   public int check(@PathVariable("Sid")Integer Sid,@PathVariable("Jid") Integer Jid)
    {int cnt=0;
        Float ctc= Float.valueOf(hiringRepository.findById(Jid).get().getCTC());
        Integer StudId=studentRepository.findID(Sid);
        List<Result> results= (List<Result>) resultRepository.findAll();
        for(int i=0;i<results.size();i++)
        {
            if(results.get(i).getSId()==StudId && results.get(i).getCTC()>=ctc)
            {
                cnt++;
            }
        }
        return cnt;
    }



    @GetMapping("/stdIn/{JobId}")
    public List<ResultShow> getResult(@PathVariable ("JobId") Integer JobId){
        List<ResultShow> resultShowList=new ArrayList<>();
        List<Result> resultList= (List<Result>) resultRepository.findAll();
        List<Student> studentList= (List<Student>) studentRepository.findAll();
        for (int i=0;i<resultList.size();i++)
        {
            if(resultList.get(i).getJId()==JobId)
            {
                for(int j=0;j<studentList.size();j++)
                {
                    if(resultList.get(i).getSId()==studentList.get(j).getRoll())
                    {
                        ResultShow resultShow=new ResultShow(resultList.get(i).getCName(),studentList.get(j).getName(),studentList.get(j).getGender(),studentList.get(j).getRoll(),5,studentList.get(j).getBranch(),resultList.get(i).getRole(),resultList.get(i).getCTC());
                        resultShowList.add(resultShow);
                    }
                }
            }

        }

return  resultShowList;
    }






}
