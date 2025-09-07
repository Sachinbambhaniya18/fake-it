package com.krane.fakeit.impl;

import com.krane.fakeit.model.MockEndPoint;
import com.krane.fakeit.repository.MockRequestsRepository;
import com.krane.fakeit.service.MockManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MockManagementServiceImpl implements MockManagementService {

    @Autowired
    MockRequestsRepository mockRequestsRepository;

    @Override
    public ResponseEntity<String> createMock(MockEndPoint mockEndPoint) {
        try {
            mockRequestsRepository.save(mockEndPoint);
            return new ResponseEntity<>("Success", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Request Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<MockEndPoint>> getMocks() {
        try {
            return new ResponseEntity<>(mockRequestsRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<MockEndPoint> getMockById(UUID id) {
        try {
            return new ResponseEntity<>(mockRequestsRepository.getMockById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MockEndPoint(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteMockById(UUID id) {
        try {
            mockRequestsRepository.deleteMockById(id);
            return new ResponseEntity<>("Mock Deleted Successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Request Failed", HttpStatus.BAD_REQUEST);
        }
    }
}
