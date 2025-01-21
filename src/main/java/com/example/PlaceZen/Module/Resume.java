package com.example.PlaceZen.Module;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int Sid;
    private String ImageName;
    private String ImagePath;
    private String ImageType;

    public Resume(int sid, String imageName, String imagePath, String imageType) {
        Sid = sid;
        ImageName = imageName;
        ImagePath = imagePath;
        ImageType = imageType;
    }
}
