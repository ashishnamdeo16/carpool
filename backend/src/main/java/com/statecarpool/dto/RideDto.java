package com.statecarpool.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

public record RideDto(
    Long id,
    UserDto driver,
    String origin,
    String destination,
    LocalDateTime departureTime,
    Integer availableSeats,
    Integer totalSeats,
    BigDecimal pricePerSeat,
    String description,
    String carModel,
    String carPlate,
    String status,
    Instant createdAt
) {}
