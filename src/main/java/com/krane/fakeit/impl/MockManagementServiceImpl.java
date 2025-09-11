package com.krane.fakeit.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krane.fakeit.dto.MockEndPointDTO;
import com.krane.fakeit.entity.MockEndPoint;
import com.krane.fakeit.mapper.MockMapper;
import com.krane.fakeit.repository.MockRequestsRepository;
import com.krane.fakeit.service.MockManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Implementation of the {@link MockManagementService} interface.
 *
 * <p>This service handles the business logic for managing mock endpoints.
 * It acts as the layer between the controller and the database repository.</p>
 *
 * <ul>
 *   <li>Create new mock API definitions.</li>
 *   <li>Retrieve all mock definitions or a specific one by ID.</li>
 *   <li>Delete mock definitions.</li>
 * </ul>
 */
@Service
public class MockManagementServiceImpl implements MockManagementService {

    @Autowired
    private MockRequestsRepository mockRequestsRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public ResponseEntity<String> createMock(MockEndPointDTO dto) {
        try {

            MockEndPoint entity = MockMapper.toEntity(dto, objectMapper);
            mockRequestsRepository.save(entity);
            return new ResponseEntity<>("Success", HttpStatus.CREATED);

        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Mock with this path and method already exists", HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("Request Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<MockEndPointDTO>> getMocks() {
        try {
            List<MockEndPointDTO> dtos = mockRequestsRepository.findAll()
                    .stream()
                    .map(entity -> MockMapper.toDto(entity, objectMapper))
                    .toList();
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<MockEndPointDTO> getMockById(UUID id) {
        try {
            return mockRequestsRepository.findById(id)
                    .map(entity -> new ResponseEntity<>(MockMapper.toDto(entity, objectMapper), HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteMockById(UUID id) {
        try {
            mockRequestsRepository.deleteById(id);
            return new ResponseEntity<>("Mock Deleted Successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Mock not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Request Failed", HttpStatus.BAD_REQUEST);
        }
    }
}

