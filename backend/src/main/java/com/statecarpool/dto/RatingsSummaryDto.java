package com.statecarpool.dto;

public record RatingsSummaryDto(
    Long userId,
    Double averageScore,
    Long totalRatings
) {}
