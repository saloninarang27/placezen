package com.example.PlaceZen.Module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Coordinators {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int CId;
    private String Name;
    private String Branch;
    private String Semester;
    private String Contact;
    private String Email;
    private String Username;
    private String Password;

    public Coordinators(String name, String branch, String semester, String contact, String email, String username, String password) {
        Name = name;
        Branch = branch;
        Semester = semester;
        Contact = contact;
        Email = email;
        Username = username;
        Password = password;
    }
}
