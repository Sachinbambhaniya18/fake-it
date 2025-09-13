package com.krane.fakeit.entity;

import com.krane.fakeit.enums.HttpMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

/**
 * Entity class representing a mock API definition.
 *
 * <p>Each row in the <code>mock_requests</code> table corresponds to a mock endpoint.</p>
 *
 * <p>Uniqueness constraint is enforced at the database level on path + method.</p>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "mock_requests",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"path", "method"})
        }
)
public class MockEndPoint {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @UuidGenerator
    @Column(name = "mock_id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "path", nullable = false)
    private String path;

    @Enumerated(EnumType.STRING)
    @Column(name = "method", nullable = false)
    private HttpMethod method;

    @Column(name = "status_code", nullable = false)
    private int statusCode;

    @Column(name = "response_body", columnDefinition = "TEXT")
    private String responseBody;

    @Column(name = "enabled", nullable = false, columnDefinition = "boolean")
    private boolean enabled;

    public void toggle() {
        this.enabled = !this.enabled;
    }

}
