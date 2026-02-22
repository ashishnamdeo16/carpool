package com.statecarpool.dto;

import jakarta.validation.constraints.Size;

public record UpdateMeRequest(
    @Size(max = 100)
    String firstName,

    @Size(max = 100)
    String lastName,

    @Size(max = 20)
    String phone,

    @Size(max = 512)
    String avatarUrl
) {}
