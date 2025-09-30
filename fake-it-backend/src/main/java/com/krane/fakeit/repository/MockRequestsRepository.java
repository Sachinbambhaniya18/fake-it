package com.krane.fakeit.repository;

import com.krane.fakeit.entity.MockEndPoint;
import com.krane.fakeit.enums.HttpMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for the <code>mock_requests</code> table.
 *
 */
@Repository
public interface MockRequestsRepository extends JpaRepository<MockEndPoint, UUID> {

    Optional<MockEndPoint> findByPathAndMethodAndEnabled(String path, HttpMethod Method, boolean enabled);

    @Modifying
    @Transactional
    @Query(value = "UPDATE mock_requests SET enabled = NOT enabled WHERE mock_id = :id", nativeQuery = true)
    int toggleEnabled(@Param("id") UUID id);

}
