package com.krane.fakeit.controller;

import com.krane.fakeit.impl.MockManagementServiceImpl;
import com.krane.fakeit.model.MockEndPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping
public class MockManagementController {

    @Autowired
    private MockManagementServiceImpl mockManagementService;

    @PostMapping("/mocks")
    public ResponseEntity<String> createMock(@RequestBody MockEndPoint mockEndPoint) {
        System.out.println(mockEndPoint.toString());
        return mockManagementService.createMock(mockEndPoint);
    }

    @GetMapping("/mocks")
    public ResponseEntity<List<MockEndPoint>> getMocks() {
        return mockManagementService.getMocks();
    }

    @GetMapping("/mocks/{id}")
    public ResponseEntity<MockEndPoint> getMockById(@PathVariable UUID id) {
        return mockManagementService.getMockById(id);
    }

    @DeleteMapping("/mocks/{id}")
    public ResponseEntity<String> deleteMockById(@PathVariable UUID id) {
        return mockManagementService.deleteMockById(id);
    }
}
