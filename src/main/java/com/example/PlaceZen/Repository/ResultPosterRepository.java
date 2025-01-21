package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.ResultPoster;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultPosterRepository extends CrudRepository<ResultPoster, Integer> {

}
