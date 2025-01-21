package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Hiring;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HiringRepository extends CrudRepository<Hiring,Integer> {
}
