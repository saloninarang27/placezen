package com.example.PlaceZen.Module;
import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int JId;
    private int SId;
    private int CTC;
    private String CName;
    private String Role;
    public Result(int JId, int SId, int CTC, String CName, String role) {
        this.JId = JId;
        this.SId = SId;
        this.CTC = CTC;
        this.CName = CName;
        Role = role;
    }
}
