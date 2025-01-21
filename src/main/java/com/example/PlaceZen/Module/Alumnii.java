package com.example.PlaceZen.Module;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class Alumnii {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int Roll;
    private String Job;
    private String Name;
    private Integer Session;
//    private String JobRole;
//    private float CTC;
    private String Description;
    @Transient
    private String Gender;

    public Alumnii(int roll, String job, String name, Integer session, String description) {
        Roll = roll;
        Job = job;
        Name = name;
        Session = session;
        Description = description;
    }

    public Alumnii(int roll, String job, String name, Integer session, String description, String gender) {
        Roll = roll;
        Job = job;
        Name = name;
        Session = session;
        Description = description;
        Gender = gender;
    }
    public Alumnii(String job, String description) {

        Job = job;

        Description = description;

    }

}
