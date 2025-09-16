package com.krane.fakeit.dto;

import com.fasterxml.jackson.databind.JsonNode;
import com.krane.fakeit.enums.HttpMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MockEndPointDTO {
    private UUID id;
    private String name;
    private String path;
    private HttpMethod method;
    private int statusCode;
    private JsonNode responseBody;
    private boolean enabled;
}
