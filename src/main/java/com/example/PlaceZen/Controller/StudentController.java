package com.example.PlaceZen.Controller;
import com.example.PlaceZen.Module.Hiring;
import com.example.PlaceZen.Module.Result;
import com.example.PlaceZen.Module.ResultShow;
import com.example.PlaceZen.Module.Student;
import com.example.PlaceZen.Repository.HiringRepository;
import com.example.PlaceZen.Repository.ResultRepository;
import com.example.PlaceZen.Repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private HiringRepository hiringRepository;
   private final String path = "../../Images";

//    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

    @PostMapping("/add")
    public ResponseEntity<String> RegisterStudent(
            @RequestParam("roll") Integer Roll,
            @RequestParam("name") String Name,
            @RequestParam("dob") String DOB,
            @RequestParam("mobile") String Mobile,
            @RequestParam("gender") String Gender,
            @RequestParam("email") String Email,
            @RequestParam("linkedin") String Linkedin,
            @RequestParam("github") String Github,
            @RequestParam("cgpa") Float CGPA,
            @RequestParam("skills") String Skills,
            @RequestParam("backlog") Integer Backlog,
            @RequestParam("interest") String Interest,
            @RequestParam("portfolio") String Portfolio,
            @RequestParam("experience") String Experience,
            @RequestParam("imageName") String imageName,
            @RequestParam("imagePath") String imagePath,
            @RequestParam("imageType") String imageType,
            @RequestParam("password") String Password,
            @RequestParam("semester") Integer Semester,
            @RequestParam("branch") String Branch,
            @RequestParam("s") Integer SSession
    )  throws IOException{

//        Student student = new Student(Roll,Name,Semester,Branch,DOB,Mobile,Gender,Email,Linkedin,Github,CGPA,Backlog,Skills,Interest,Portfolio,Experience,ImageName,ImagePath,ImageType,Password);
        Student student= new Student(Roll,Name,Semester,Branch,DOB,Mobile,Gender,Email,Linkedin,Github,CGPA,Backlog,Skills,Interest,Portfolio,Experience,imageName,imagePath,imageType,Password,SSession);
        studentRepository.save(student);

        return ResponseEntity.ok("Upload successful");
    }
    @GetMapping("/GetProfile/{Username}/{Password}")
    public int GetProfile(@PathVariable("Username")int username, @PathVariable("Password")String password){
       return studentRepository.getId(username,password);

    }
    @GetMapping("/getStudent/{Id}")
    public Optional<Student> getprofiles(@PathVariable("Id") Integer Id)
    {
        return studentRepository.findById(Id);
    }

    @GetMapping("/downloadImage/{id}")
    public ResponseEntity<byte[]> StudentImage(@PathVariable("id") int id) throws IOException {
        String fileName=studentRepository.getFileName(id);
        System.out.println(fileName);
        Optional<Student> imageObject=studentRepository.findByAdminImageName(fileName);
        String fullPath = imageObject.get().getImagePath();
        byte[] image= Files.readAllBytes(new File(fullPath).toPath());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
        //return fileName;
    }

    @GetMapping("/all")
    public List<Student> allStudets()
    {
        return (List<Student>) studentRepository.findAll();
    }

    @GetMapping("/allS")
    public List<ResultShow> find()
    {
       List<Student> students= (List<Student>) studentRepository.findAll();
       List<Result> results= (List<Result>) resultRepository.findAll();
       List<ResultShow> rs=new ArrayList<>();
       for(int i=0;i<results.size();i++)
       {
           for(int j=0;j<students.size();j++)
           {
               if(results.get(i).getSId()== students.get(j).getRoll())
               {
                   ResultShow resultShow=new ResultShow();
                   resultShow.setCompName(results.get(i).getCName());
                   resultShow.setBranch(students.get(j).getBranch());
                   resultShow.setRole(results.get(i).getRole());
                   resultShow.setCTC(results.get(i).getCTC());
                   resultShow.setRoll(students.get(j).getRoll());
                   resultShow.setStudName(students.get(j).getName());
                   resultShow.setSession(students.get(j).getSSession());
                   resultShow.setGender(students.get(j).getGender());
                   rs.add(resultShow);
//                   break;
               }
           }
       }
       return  rs;

    }

    @GetMapping("/find/{Id}")
    public  Integer finduuu(@PathVariable("Id") Integer Id)
    {
        return  studentRepository.findID(Id);
    }


    @GetMapping("/cal/{year}")
    public Integer Calcu(@PathVariable("year") Integer year)
    {
        List<Student> students= (List<Student>) studentRepository.findAll();
        List<Result> results= (List<Result>) resultRepository.findAll();
        Integer count=0;
//        System.out.println(results.size());
        for(int i=0;i<results.size();i++)
        {
            for(int j=0;j<students.size();j++)
            {
                if(results.get(i).getSId()==students.get(j).getRoll() && students.get(j).getSSession()==year)
                {
//                    System.out.println(students.get(j).getName());
                    count++;
                    break;}
            }
        }
        return count;
    }

    @GetMapping("/calc/{branch}")
    public Integer Calcus(@PathVariable("branch") String branch)
    {
        List<Student> students= (List<Student>) studentRepository.findAll();
        List<Result> results= (List<Result>) resultRepository.findAll();
        Integer count=0;
//        System.out.println(results.size());
        for(int i=0;i<results.size();i++)
        {
            for(int j=0;j<students.size();j++)
            {
                if(results.get(i).getSId()==students.get(j).getRoll() && students.get(j).getBranch().equals(branch))
                {
//                    System.out.println(students.get(j).getName());
                    count++;
                    break;}
            }
        }
        return count;
    }

    @GetMapping("/delete/{id}")
    public  String deletu(@PathVariable("id") Integer id)
    {
        studentRepository.deleteById(id);
        return "Deleted";
   }

    @GetMapping("update/{roll}/{cgpa}")
    @Transactional
    public String updatuu(@PathVariable("roll")Integer roll,
                          @PathVariable("cgpa") Float cgpa)
    {
        studentRepository.updte(roll);
       Student student= studentRepository.Stud(roll);
       Float AvgCgpa= student.getCgpa();
       Integer currSem=student.getSemester()-1;
       Float CurrCgpa=( (AvgCgpa*currSem)+cgpa)/(currSem+1);
       studentRepository.updteCgpa(roll,cgpa);

        return "Updated";
    }

    @GetMapping("/stu/{dept}")
    public List<Student> deptu(@PathVariable("dept") String dept)
    {
        return  studentRepository.deptStd(dept);
    }



//    @GetMapping("/details/{Name}")
//    public List<ResultShow> resultShows(@PathVariable("name")String Name){
//        List<Student> students= (List<Student>) studentRepository.findAll();
//        List<Result> results= (List<Result>) resultRepository.findAll();
//        List<ResultShow> rs=new ArrayList<>();
//        for(int i=0;i<results.size();i++)
//        {
//            if(results.get(i).getCName().equals(Name)){
//                for(int j=0;j<students.size();j++)
//                {
//                    if(results.get(i).getSId()==students.get(j).getRoll())
//                    {  System.out.println("Matched:" + students.get(j).getName());
//                        ResultShow resultShow=new ResultShow();
//                        resultShow.setCompName(results.get(i).getCName());
//                        resultShow.setBranch(students.get(j).getBranch());
//                        resultShow.setRole(results.get(i).getRole());
//                        resultShow.setCTC(results.get(i).getCTC());
//                        resultShow.setRoll(students.get(j).getRoll());
//                        resultShow.setStudName(students.get(j).getName());
//                        resultShow.setSession(students.get(j).getSSession());
//                        resultShow.setGender(students.get(j).getGender());
//                        rs.add(resultShow);
////                   break;
//                    }
//                }
//            }
//
//        }
//        return  rs;
//
//
//    }


    @GetMapping("/details/{compId}")
    public List<ResultShow> resultShows(@PathVariable("compId") Integer compId){


        List<Object[]> results = resultRepository.findRollNumbersAndCTCByCompanyId(compId);
        List<Student> studentList= (List<Student>) studentRepository.findAll();
        List<ResultShow> resultShowList=new ArrayList<>();
        for(Object[] result : results)
        {
            for(int i=0;i<studentList.size();i++)
            {
                if(result[0].equals(studentList.get(i).getRoll()))
                {
                    ResultShow resultShow=new ResultShow("",studentList.get(i).getName(),studentList.get(i).getGender(),studentList.get(i).getRoll(),studentList.get(i).getSSession(),studentList.get(i).getBranch(),result[2].toString(),(Integer) result[1]
                    );
                    resultShowList.add(resultShow);
                    break;
                }
            }
        }
return resultShowList;
    }


    @GetMapping("/std/{year}/{lpa}")
    public  List<ResultShow> StdyearLpa(@PathVariable("year") Integer year,@PathVariable("lpa") Integer lpa)
    {
        List<Student> students= (List<Student>) studentRepository.findAll();
        List<Result> results= (List<Result>) resultRepository.findAll();
        List<ResultShow> rs=new ArrayList<>();

        for(int i=0;i<results.size();i++)
        {
            if(results.get(i).getCTC()>=lpa*100000 ){
                for(int j=0;j<students.size();j++)
                {
                    if(results.get(i).getSId()== students.get(j).getRoll() && students.get(j).getSSession()==year-4)
                    {
                        ResultShow resultShow=new ResultShow();
                        resultShow.setCompName(results.get(i).getCName());
                        resultShow.setBranch(students.get(j).getBranch());
                        resultShow.setRole(results.get(i).getRole());
                        resultShow.setCTC(results.get(i).getCTC());
                        resultShow.setRoll(students.get(j).getRoll());
                        resultShow.setStudName(students.get(j).getName());
                        resultShow.setSession(students.get(j).getSSession());
                        resultShow.setGender(students.get(j).getGender());
                        rs.add(resultShow);
//                   break;
                    }
                }
            }

        }
        return  rs;


    }

}