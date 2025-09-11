package com.krane.fakeit.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.krane.fakeit.dto.MockEndPointDTO;
import com.krane.fakeit.entity.MockEndPoint;

public class MockMapper {

    public static MockEndPoint toEntity(MockEndPointDTO dto, ObjectMapper objectMapper) {
        try {
            return MockEndPoint.builder()
                    .id(dto.getId())
                    .name(dto.getName())
                    .path(dto.getPath())
                    .method(dto.getMethod())
                    .statusCode(dto.getStatusCode())
                    .enabled(dto.isEnabled())
                    .responseBody(objectMapper.writeValueAsString(dto.getResponseBody()))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert DTO to Entity", e);
        }
    }

    public static MockEndPointDTO toDto(MockEndPoint entity, ObjectMapper objectMapper) {
        try {
            JsonNode body = objectMapper.readTree(entity.getResponseBody());
            return MockEndPointDTO.builder()
                    .id(entity.getId())
                    .name(entity.getName())
                    .path(entity.getPath())
                    .method(entity.getMethod())
                    .statusCode(entity.getStatusCode())
                    .enabled(entity.isEnabled())
                    .responseBody(body)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert Entity to DTO", e);
        }
    }
}
