package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Resume;
import com.example.PlaceZen.Module.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeRepository extends CrudRepository<Resume,Integer> {
    @Query("select m.ImageName from Resume m where m.Sid=:id")
    String getFileName(@Param("id") int id);

    @Query("select m from Resume m where m.ImageName=:filename")
    Optional<Resume> findByAdminImageName(@Param("filename") String filename);
}
