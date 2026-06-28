package com.abhinav.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@RestController
public class AdminController {
  
    @GetMapping("/api/admin/summary")
    public Map<String, Object> adminSummary() {
        return Map.of(
            "message", "Admin-only operational summary",
            "activitySessions", 12,
            "failedLoginAlerts", 1
        );
    }
    
}
