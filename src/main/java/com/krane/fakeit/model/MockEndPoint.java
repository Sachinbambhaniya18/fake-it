package com.krane.fakeit.model;

import com.krane.fakeit.enums.HttpMethod;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "mock_requests")
public class MockEndPoint {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "mock_id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "path")
    private String path;

    @Enumerated(EnumType.STRING)
    @Column(name = "method", nullable = false)
    private HttpMethod method;

    @Column(name = "status_code")
    private int statusCode;

    @Lob
    @Column(name = "response_body", columnDefinition = "TEXT")
    private String responseBody;
}
