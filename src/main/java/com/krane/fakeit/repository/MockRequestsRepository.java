package com.krane.fakeit.repository;

import com.krane.fakeit.model.MockEndPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository interface for the <code>mock_requests</code> table.
 *
 */
@Repository
public interface MockRequestsRepository extends JpaRepository<MockEndPoint, UUID> {
}
