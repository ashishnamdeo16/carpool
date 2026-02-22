package com.statecarpool.controller;

import com.statecarpool.dto.CreateRatingRequest;
import com.statecarpool.dto.RatingsSummaryDto;
import com.statecarpool.entity.Rating;
import com.statecarpool.service.RatingService;
import com.statecarpool.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Ratings", description = "User ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/ratings")
    @Operation(summary = "Create rating (after ACCEPTED ride)")
    public ResponseEntity<Map<String, Long>> create(@Valid @RequestBody CreateRatingRequest req) {
        Long userId = SecurityUtil.getCurrentUserId();
        Rating rating = ratingService.create(userId, req);
        return ResponseEntity.ok(Map.of("id", rating.getId()));
    }

    @GetMapping("/users/{id}/ratings-summary")
    @Operation(summary = "Get user ratings summary")
    public ResponseEntity<RatingsSummaryDto> getRatingsSummary(@PathVariable Long id) {
        return ResponseEntity.ok(ratingService.getRatingsSummary(id));
    }
}
