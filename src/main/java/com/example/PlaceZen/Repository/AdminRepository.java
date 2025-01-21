package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Admin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin,Integer> {
//    @Query("SELECT m.id FROM Admin m WHERE m.Username =:username AND m.Password=:password")
//    public Integer getbyUsername(@Param("username") String username,@Param("password") String password);

    @Query("SELECT COALESCE(m.id, -1) FROM Admin m WHERE m.Username = :username AND m.Password = :password")
    public Integer getbyUsername(@Param("username") String username, @Param("password") String password);



}
