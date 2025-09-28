package com.krane.fakeit.controller;

import com.krane.fakeit.dto.MockEndPointDTO;
import com.krane.fakeit.impl.MockManagementServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST controller for managing mock API definitions.
 *
 * <p>This controller exposes CRUD operations under the <code>/mocks</code> path.
 * It allows testers or developers to dynamically create, view, and delete
 * mock endpoints at runtime.</p>
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/fake-it/v1")
public class MockManagementController {

    @Autowired
    private MockManagementServiceImpl mockManagementService;

    @PostMapping("/mocks")
    public ResponseEntity<String> createMock(@RequestBody MockEndPointDTO dto) {
        return mockManagementService.createMock(dto);
    }

    @GetMapping("/mocks")
    public ResponseEntity<List<MockEndPointDTO>> getMocks() {
        return mockManagementService.getMocks();
    }

    @GetMapping("/mocks/{id}")
    public ResponseEntity<MockEndPointDTO> getMockById(@PathVariable UUID id) {
        return mockManagementService.getMockById(id);
    }

    @PutMapping("/mocks/{id}/toggle")
    public void toggleMock(@PathVariable UUID id) {
        mockManagementService.toggleMock(id);
    }

    @DeleteMapping("/mocks/{id}")
    public ResponseEntity<String> deleteMockById(@PathVariable UUID id) {
        return mockManagementService.deleteMockById(id);
    }
}
