package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Session;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends CrudRepository<Session,Integer> {
}
