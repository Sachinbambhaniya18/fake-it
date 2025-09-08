package com.krane.fakeit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the FakeIt application.
 *
 * <p>FakeIt is a lightweight API mocking server built with Spring Boot.
 * It allows developers and testers to dynamically create and manage
 * mock API endpoints without writing backend code.</p>
 *
 * <p>Main features of the application:</p>
 * <ul>
 *   <li>Expose CRUD endpoints under <code>/mocks</code> for creating,
 *       listing, retrieving, and deleting mock definitions.</li>
 *   <li>Store mock definitions (path, method, status code, response body)
 *       in a relational database.</li>
 *   <li>Intercept arbitrary requests through a catch-all controller and
 *       return preconfigured mock responses.</li>
 * </ul>
 *
 */
@SpringBootApplication
public class FakeItApplication {

	public static void main(String[] args) {
		SpringApplication.run(FakeItApplication.class, args);
	}

}
