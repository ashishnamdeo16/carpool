package com.statecarpool.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreateRideRequest(
    @NotBlank(message = "Origin is required")
    @Size(max = 255)
    String origin,

    @NotBlank(message = "Destination is required")
    @Size(max = 255)
    String destination,

    @NotNull(message = "Departure time is required")
    LocalDateTime departureTime,

    @NotNull(message = "Total seats is required")
    @Min(value = 1, message = "Total seats must be at least 1")
    Integer totalSeats,

    @NotNull(message = "Price per seat is required")
    @DecimalMin(value = "0", message = "Price must be non-negative")
    BigDecimal pricePerSeat,

    @Size(max = 2000)
    String description,

    @Size(max = 100)
    String carModel,

    @Size(max = 20)
    String carPlate
) {}
