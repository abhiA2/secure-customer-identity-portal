# Operational Runbook

This document explains how to check and troubleshoot the local application.

## Backend Health Check

Open:

http://localhost:8080/actuator/health

## Expected response:

    {
    "status": "UP"
    }

## Public API Check

    Open:

    http://localhost:8080/api/public/status

## Expected response:

    {
    "application": "Secure Customer Identity Portal API",
    "status": "running"
    }
