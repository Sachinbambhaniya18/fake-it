package com.krane.fakeit.service;

import com.krane.fakeit.impl.MockManagementServiceImpl;
import com.krane.fakeit.model.MockEndPoint;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for managing mock API definitions.
 *
 * <p>Defines the contract for:</p>
 * <ul>
 *   <li>Creating a mock endpoint.</li>
 *   <li>Listing all mocks.</li>
 *   <li>Fetching a mock by ID.</li>
 *   <li>Deleting a mock by ID.</li>
 * </ul>
 *
 * <p>Implemented by {@link MockManagementServiceImpl}.</p>
 */
public interface MockManagementService {

    ResponseEntity<String> createMock(MockEndPoint mockEndPoint);

    ResponseEntity<List<MockEndPoint>> getMocks();

    ResponseEntity<MockEndPoint> getMockById(UUID id);

    ResponseEntity<String> deleteMockById(UUID id);
}
