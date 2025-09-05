package com.krane.fakeit.data;

import jakarta.persistence.*;

@Entity
@Table(name = "mock_requests")
public class MockEndPoint {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "mock_id")
    private Long id;

    @Column(name = "path")
    private String path;

    @Column(name = "method")
    private String method;

    @Column(name = "status_code")
    private int statusCode;

    @Lob
    @Column(name = "response_body")
    private String responseBody;
}
