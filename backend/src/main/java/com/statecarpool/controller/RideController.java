package com.statecarpool.controller;

import com.statecarpool.dto.*;
import com.statecarpool.service.RideService;
import com.statecarpool.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rides")
@Tag(name = "Rides", description = "Ride management")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping
    @Operation(summary = "Create a ride (driver)")
    public ResponseEntity<RideDto> create(@Valid @RequestBody CreateRideRequest req) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(rideService.create(userId, req));
    }

    @GetMapping("/search")
    @Operation(summary = "Search rides")
    public ResponseEntity<Page<RideDto>> search(
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Integer seats,
            @RequestParam(required = false, defaultValue = "departure") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(rideService.search(origin, destination, date, seats, sort, page, size));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get ride by ID")
    public ResponseEntity<RideDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(rideService.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update ride (driver only)")
    public ResponseEntity<RideDto> update(@PathVariable Long id, @Valid @RequestBody UpdateRideRequest req) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(rideService.update(id, userId, req));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete ride (driver only)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        rideService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    @Operation(summary = "Get my rides (driver)")
    public ResponseEntity<List<RideDto>> getMyRides() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(rideService.getMyRides(userId));
    }
}
