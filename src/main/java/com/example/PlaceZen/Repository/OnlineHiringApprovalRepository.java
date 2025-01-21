package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.OnlineHiringApproval;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnlineHiringApprovalRepository extends CrudRepository<OnlineHiringApproval,Integer> {
}
