package com.statecarpool.dto;

import java.time.Instant;

public record UserDto(
    Long id,
    String email,
    String firstName,
    String lastName,
    String phone,
    String avatarUrl,
    Instant createdAt
) {}
