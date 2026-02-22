package com.statecarpool.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateRatingRequest(
    @NotNull(message = "Ride ID is required")
    Long rideId,

    @NotNull(message = "User to rate ID is required")
    Long toUserId,

    @NotNull(message = "Score is required")
    @Min(value = 1, message = "Score must be 1-5")
    @Max(value = 5, message = "Score must be 1-5")
    Integer score,

    @Size(max = 500)
    String comment
) {}
