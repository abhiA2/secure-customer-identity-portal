package com.abhinav.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.Instant;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CustomerController {
    
    @GetMapping("/api/dashboard")
    public Map<String, Object> dashboard() {
        return Map.of(
            "message", "Secure Customer Dashboard data",
            "status", "available",
            "timestamp", Instant.now().toString()
        );
    }

    @GetMapping("/api/profile")
    public Map<String, Object> profile() {
        return Map.of(
            "message", "Customer Profile endpoint is protected",
            "note", "Auth0 user claims will be returned here after JWT Integration"
        );
    }    
}
