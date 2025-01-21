package com.example.PlaceZen.Module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OnlineHiring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int JobId;
    private String CompanyName;
    private String Role;
    private String Link;

    public OnlineHiring(String companyName, String role, String link) {
        CompanyName = companyName;
        Role = role;
        Link = link;
    }
}
