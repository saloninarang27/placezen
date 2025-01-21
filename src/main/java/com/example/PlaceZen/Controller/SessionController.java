package com.example.PlaceZen.Controller;

import com.example.PlaceZen.Module.Hiring;
import com.example.PlaceZen.Module.Session;
import com.example.PlaceZen.Repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/session")
@CrossOrigin
public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @PostMapping("/add")
    public ResponseEntity<String> adding(
            @RequestParam("name") String Name,
            @RequestParam("location") String Location,
            @RequestParam("date") String Date,
            @RequestParam("speaker") String Speaker,
            @RequestParam("timing") String Timing,
            @RequestParam("description") String Description){

        Session session=new Session(Name,Location,Date,Speaker,Timing,Description);
        sessionRepository.save(session);
        return ResponseEntity.ok("Added successful");
    }
    @GetMapping("/hate")
    public List<Session> hated(){
        return (List<Session>) sessionRepository.findAll();

    }

    @GetMapping("/get")
    public List<Session> thisthat(){
//      return (List<Hiring>) hiringRepository.findAll();

        List<Session> sessions= (List<Session>) sessionRepository.findAll();
        List<Session> ss=new ArrayList<>();
        for(int i=0;i<sessions.size();i++)
        {
            String date1= (sessions.get(i).getDate());
            LocalDate date= LocalDate.parse(date1);
            LocalDate now = LocalDate.now();
            if(( date.isAfter(now) || date.isEqual(now) )){
                ss.add(sessions.get(i));
            }
        }
        return ss;
    }

}
