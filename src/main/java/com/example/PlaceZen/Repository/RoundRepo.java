package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoundRepo extends CrudRepository<Round,Integer> {
    @Query("SELECT r FROM Round r WHERE r.JobId = :JobId")
    List<Round> findByJobIdCustom(@Param("JobId") Long jobId);

}
