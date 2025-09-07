package com.krane.fakeit.repository;

import com.krane.fakeit.model.MockEndPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface MockRequestsRepository extends JpaRepository<MockEndPoint, UUID> {

    @Query(value = "SELECT * FROM mock_requests WHERE mock_id = :mock_id")
    MockEndPoint getMockById(@Param("mock_id") UUID id);

    @Query(value = "DELETE FROM mock_requests WHERE mock_id = :mock_id")
    String deleteMockById(@Param("mock_id") UUID id);

}
