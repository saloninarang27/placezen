package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.Status;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusRepository extends CrudRepository<Status,Integer> {
    Optional<Status> findByJobId(int jobId);

}
