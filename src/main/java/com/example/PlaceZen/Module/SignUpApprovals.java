package com.example.PlaceZen.Module;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity

public class SignUpApprovals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private int Roll;
    private String Name;
    private int Semester;
    private String Branch;
    private String DOB;
    private String Mobile;
    private String Gender;
    private String Email;
    private String Linkedin;
    private String Github;
    private Float Cgpa;
    private int Backlog;
    private String Skills;
    private String Interest;
    private String Portfolio;
    private String Experience;
    private String ImageName;
    private String ImagePath;
    private String ImageType;
    private String Password;
    private int SSession;

    public SignUpApprovals(int roll, String name, int semester, String branch, String DOB, String mobile, String gender, String email, String linkedin, String github, Float cgpa, int backlog, String skills, String interest, String portfolio, String experience, String imageName, String imagePath, String imageType, String password,int ssession) {
        Roll = roll;
        Name = name;
        Semester = semester;
        Branch = branch;
        this.DOB = DOB;
        Mobile = mobile;
        Gender = gender;
        Email = email;
        Linkedin = linkedin;
        Github = github;
        Cgpa = cgpa;
        Backlog = backlog;
        Skills = skills;
        Interest = interest;
        Portfolio = portfolio;
        Experience = experience;
        ImageName = imageName;
        ImagePath = imagePath;
        ImageType = imageType;
        Password = password;
        SSession=ssession;
    }


}
