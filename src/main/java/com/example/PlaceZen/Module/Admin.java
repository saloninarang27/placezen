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

public class  Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String Name;
    private String Phone;
    private String Email;
    private String Linkedin;
    private String Designation;
    private String Department;
    private String Username;
    private String Password;

    public Admin(String name, String phone, String email, String linkedin, String designation, String department, String username, String password) {
        Name = name;
        Phone = phone;
        Email = email;
        Linkedin = linkedin;
        Designation = designation;
        Department = department;
        Username = username;
        Password = password;
    }
}
