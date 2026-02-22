package com.statecarpool.dto;

import java.time.Instant;

public record BookingDto(
    Long id,
    RideDto ride,
    UserDto rider,
    Integer requestedSeats,
    String status,
    String message,
    Instant createdAt
) {}
