package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Applied;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppliedRepository extends CrudRepository<Applied,Integer> {
    @Query("SELECT m FROM Applied m WHERE m.JobId=:Jid AND m.StudentId=:Sid")
    public Applied check(@Param("Sid")Integer Sid,@Param("Jid")Integer Jid);

    @Query("SELECT m from Applied m WHERE m.StudentId=:Sid")
    public List<Applied> findu(@Param("Sid") Integer Sid );

    @Query("SELECT m from Applied m WHERE m.JobId=:Jid")
    public  List<Applied> findus(@Param("Jid") Integer Jid);

//    List<Applied> findAllById(Integer jid);
}
