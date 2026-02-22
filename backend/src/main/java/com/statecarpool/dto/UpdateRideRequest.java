package com.statecarpool.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record UpdateRideRequest(
    @Size(max = 255)
    String origin,

    @Size(max = 255)
    String destination,

    LocalDateTime departureTime,

    @Min(value = 1)
    Integer totalSeats,

    @DecimalMin(value = "0")
    BigDecimal pricePerSeat,

    @Size(max = 2000)
    String description,

    @Size(max = 100)
    String carModel,

    @Size(max = 20)
    String carPlate
) {}
