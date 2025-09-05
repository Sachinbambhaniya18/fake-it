package com.krane.fakeit.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class MockEndPoint {
    @Id @GeneratedValue
    private Long id;
    private String path;
    private String method;
    private int statusCode;
    private String responseBody;
}
