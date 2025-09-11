package com.krane.fakeit.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krane.fakeit.constants.StatusCode;
import com.krane.fakeit.enums.HttpMethod;
import com.krane.fakeit.entity.MockEndPoint;
import com.krane.fakeit.repository.MockRequestsRepository;
import com.krane.fakeit.service.CatchAllService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Implementation of the {@link CatchAllService}.
 *
 * <p>This service is intended to power the "catch-all" feature, where
 * any incoming request that does not map to a defined controller
 * (such as <code>/mocks</code>) will be intercepted.</p>
 */
@Service
public class CatchAllServiceImpl implements CatchAllService {

    @Autowired
    private MockRequestsRepository mockRequestsRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public ResponseEntity<?> catchAll(HttpServletRequest servletRequest, String body) {
        String path = servletRequest.getRequestURI();
        String method = servletRequest.getMethod();
        String query = servletRequest.getQueryString();
        String newPath = query != null ? path = path + "?" + query : path;


        if (path.startsWith("/mocks")) {
            return ResponseEntity.notFound().build();
        }

        Optional<MockEndPoint> mock = mockRequestsRepository
                                     .findByPathAndMethodAndEnabled(newPath, HttpMethod.valueOf(method.toUpperCase()), true);

        if (mock.isEmpty()) {
            System.out.println(mock);
            return ResponseEntity.status(StatusCode.STATUS_NOT_FOUND)
                    .body("No Mock found for " + path + " for " + method);
        }

        MockEndPoint m = mock.get();
        try {
            Object json = objectMapper.readValue(m.getResponseBody(), Object.class);
            return ResponseEntity.status(m.getStatusCode()).body(json);
        } catch (Exception e) {
            return ResponseEntity.status(StatusCode.STATUS_BAD_REQUEST).body("Not a valid response");
        }
    }
}
