package com.abhinav.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class PublicController {

    @GetMapping("/api/public/status")
    public Map<String, String> status() {
        return Map.of(
            "application" , "Secure Customer Identity Portal API",
            "ststus","running"
        );
    }
    
}
