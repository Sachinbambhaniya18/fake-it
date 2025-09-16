package com.krane.fakeit.service;

import com.krane.fakeit.impl.CatchAllServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

/**
 * Service interface for the catch-all functionality.
 *
 * <p>Defines the contract for intercepting arbitrary API requests,
 * looking them up against the stored mock definitions, and
 * returning mock responses.</p>
 *
 * <p>The implementing class ({@link CatchAllServiceImpl}) provides
 * the actual logic.</p>
 */
public interface CatchAllService {
    ResponseEntity<?> catchAll(HttpServletRequest servletRequest);
}
