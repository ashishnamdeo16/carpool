package com.statecarpool.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateBookingRequest(
    @NotNull(message = "Ride ID is required")
    Long rideId,

    @NotNull(message = "Requested seats is required")
    @Min(value = 1, message = "At least 1 seat required")
    Integer requestedSeats,

    @Size(max = 500)
    String message
) {}
