package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Coordinators;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinatorsRepository extends CrudRepository<Coordinators,Integer> {
}
