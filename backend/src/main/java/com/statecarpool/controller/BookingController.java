package com.statecarpool.controller;

import com.statecarpool.dto.BookingDto;
import com.statecarpool.dto.CreateBookingRequest;
import com.statecarpool.service.BookingService;
import com.statecarpool.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "Booking management")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @Operation(summary = "Create booking (rider requests seats)")
    public ResponseEntity<BookingDto> create(@Valid @RequestBody CreateBookingRequest req) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(bookingService.create(userId, req));
    }

    @GetMapping("/me")
    @Operation(summary = "Get my bookings (rider)")
    public ResponseEntity<List<BookingDto>> getMyBookings() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(bookingService.getMyBookings(userId));
    }

    @GetMapping("/requests")
    @Operation(summary = "Get booking requests (driver)")
    public ResponseEntity<List<BookingDto>> getDriverRequests() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(bookingService.getDriverRequests(userId));
    }

    @PatchMapping("/{id}/accept")
    @Operation(summary = "Accept booking (driver)")
    public ResponseEntity<BookingDto> accept(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(bookingService.accept(id, userId));
    }

    @PatchMapping("/{id}/reject")
    @Operation(summary = "Reject booking (driver)")
    public ResponseEntity<BookingDto> reject(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(bookingService.reject(id, userId));
    }

    @PatchMapping("/{id}/cancel")
    @Operation(summary = "Cancel booking (rider)")
    public ResponseEntity<BookingDto> cancel(@PathVariable Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(bookingService.cancel(id, userId));
    }
}
