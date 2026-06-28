package com.abhinav.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.Instant;

@Entity
public class AuditEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actorSubject;
    private String eventType;
    private String outcome;
    private Instant createdAt = Instant.now();

    public AuditEvent() {
    }

    public AuditEvent(String actorSubject, String eventType, String outcome) {
        this.actorSubject = actorSubject;
        this.eventType = eventType;
        this.outcome = outcome;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getActorSubject() {
        return actorSubject;
    }

    public void setActorSubject(String actorSubject) {
        this.actorSubject = actorSubject;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}