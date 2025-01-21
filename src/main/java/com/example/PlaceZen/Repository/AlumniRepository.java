package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Alumnii;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumniRepository extends CrudRepository<Alumnii,Integer> {
}
