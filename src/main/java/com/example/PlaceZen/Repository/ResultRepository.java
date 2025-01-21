package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Result;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends CrudRepository<Result,Integer> {

    @Query("SELECT r.SId, r.CTC ,r.Role FROM Result r WHERE r.JId = :JId")
    List<Object[]> findRollNumbersAndCTCByCompanyId(@Param("JId") Integer JId);

}
