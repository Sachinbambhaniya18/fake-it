package com.krane.fakeit.repository;

import com.krane.fakeit.model.MockEndPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MockRequestsRepository extends JpaRepository<MockEndPoint, UUID> {

    @Query(value = "SELECT * FROM mock_requests WHERE mock_id = :mock_id", nativeQuery = true)
    MockEndPoint getMockById(@Param("mock_id") UUID id);

    @Query(value = "DELETE FROM mock_requests WHERE mock_id = :mock_id", nativeQuery = true)
    void deleteMockById(@Param("mock_id") UUID id);

}
