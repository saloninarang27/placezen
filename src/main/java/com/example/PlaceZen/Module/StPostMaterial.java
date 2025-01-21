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
@ToString
@Entity
public class StPostMaterial  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private  int Sid;
    private String Description;
    private String PostDate;
    private String Filename;
    private String Filetype;
    private String Filepath;

    public StPostMaterial(int sid, String description, String postDate, String filename, String filetype, String filepath) {
        Sid = sid;
        Description = description;
        PostDate = postDate;
        Filename = filename;
        Filetype = filetype;
        Filepath = filepath;
    }
}
