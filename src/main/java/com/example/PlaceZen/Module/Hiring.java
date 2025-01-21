package com.example.PlaceZen.Module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class Hiring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int JobId;
    private String CompanyName;
    private String Role;
    private float Cgpa;
    private Integer CTC;
    private int Backlog;
    private int StartSession;
    private int Semester;
    private String Branch;
    private String Description;
    private String Location;
    private String StartDate;
    private String EndDate;

    public Hiring(String companyName, String role, float cgpa, Integer CTC, int backlog, int startSession, int semester, String branch, String description, String location, String startDate, String endDate) {
        CompanyName = companyName;
        Role = role;
        Cgpa = cgpa;
        this.CTC = CTC;
        Backlog = backlog;
        StartSession = startSession;
        Semester = semester;
        Branch = branch;
        Description = description;
        Location = location;
        StartDate = startDate;
        EndDate = endDate;
    }


}


