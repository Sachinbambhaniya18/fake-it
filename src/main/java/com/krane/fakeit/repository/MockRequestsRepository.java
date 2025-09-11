package com.krane.fakeit.repository;

import com.krane.fakeit.enums.HttpMethod;
import com.krane.fakeit.entity.MockEndPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for the <code>mock_requests</code> table.
 *
 */
@Repository
public interface MockRequestsRepository extends JpaRepository<MockEndPoint, UUID> {

    Optional<MockEndPoint> findByPathAndMethodAndEnabled(String path, HttpMethod Method, boolean enabled);
}
