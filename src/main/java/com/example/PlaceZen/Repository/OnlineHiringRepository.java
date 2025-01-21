package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.OnlineHiring;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnlineHiringRepository extends CrudRepository<OnlineHiring,Integer> {
}
