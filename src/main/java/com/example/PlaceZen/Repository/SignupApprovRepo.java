package com.example.PlaceZen.Repository;

import com.example.PlaceZen.Module.SignUpApprovals;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignupApprovRepo extends CrudRepository<SignUpApprovals,Integer> {
}
