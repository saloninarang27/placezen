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
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String Sname;
    private String location;
    private String date;
    private String speaker;
    private String timings;
    private String description;

    public Session(String sname, String location, String date, String speaker, String timings, String description) {
        Sname = sname;
        this.location = location;
        this.date = date;
        this.speaker = speaker;
        this.timings = timings;
        this.description = description;
    }
}
