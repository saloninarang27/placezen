package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.StPostMaterial;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StPostRepository  extends CrudRepository<StPostMaterial,Integer> {
    @Query("Select m.Description from StPostMaterial m")
   public List<String> des();
    @Query("Select m.PostDate from StPostMaterial m")
    public List<String> dat();
    @Query("Select m.id from StPostMaterial m")
    public List<Integer> idu();


}
