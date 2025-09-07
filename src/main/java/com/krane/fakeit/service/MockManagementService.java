package com.krane.fakeit.service;

import com.krane.fakeit.model.MockEndPoint;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface MockManagementService {
    ResponseEntity<String> createMock(MockEndPoint mockEndPoint);
    ResponseEntity<List<MockEndPoint>> getMocks();
    ResponseEntity<MockEndPoint> getMockById(UUID id);
    ResponseEntity<String> deleteMockById(UUID id);
}
