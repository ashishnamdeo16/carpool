package com.statecarpool.service;

import com.statecarpool.dto.BookingDto;
import com.statecarpool.dto.CreateBookingRequest;
import com.statecarpool.entity.Booking;
import com.statecarpool.entity.Ride;
import com.statecarpool.entity.User;
import com.statecarpool.exception.BadRequestException;
import com.statecarpool.exception.ConflictException;
import com.statecarpool.exception.ForbiddenException;
import com.statecarpool.exception.ResourceNotFoundException;
import com.statecarpool.mapper.DtoMapper;
import com.statecarpool.repository.BookingRepository;
import com.statecarpool.repository.RideRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;
    private final RideService rideService;
    private final UserService userService;

    public BookingService(BookingRepository bookingRepository, RideRepository rideRepository,
                          RideService rideService, UserService userService) {
        this.bookingRepository = bookingRepository;
        this.rideRepository = rideRepository;
        this.rideService = rideService;
        this.userService = userService;
    }

    @Transactional
    public BookingDto create(Long riderId, CreateBookingRequest req) {
        Ride ride = rideService.getEntity(req.rideId());
        User rider = userService.getEntity(riderId);

        if (ride.getDriver().getId().equals(riderId)) {
            throw new BadRequestException("Driver cannot book their own ride");
        }
        if (!"ACTIVE".equals(ride.getStatus())) {
            throw new BadRequestException("Ride is not available for booking");
        }
        if (ride.getAvailableSeats() < req.requestedSeats()) {
            throw new BadRequestException("Not enough seats available");
        }

        long pendingOrAccepted = bookingRepository.findAll().stream()
                .filter(b -> b.getRide().getId().equals(req.rideId()) && b.getRider().getId().equals(riderId))
                .filter(b -> "PENDING".equals(b.getStatus()) || "ACCEPTED".equals(b.getStatus()))
                .mapToLong(b -> b.getRequestedSeats())
                .sum();
        if (pendingOrAccepted + req.requestedSeats() > ride.getTotalSeats()) {
            throw new BadRequestException("You already have a booking or requested more seats than available");
        }

        Booking booking = new Booking();
        booking.setRide(ride);
        booking.setRider(rider);
        booking.setRequestedSeats(req.requestedSeats());
        booking.setStatus("PENDING");
        booking.setMessage(req.message());
        booking = bookingRepository.save(booking);
        return toBookingDto(booking);
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getMyBookings(Long riderId) {
        return bookingRepository.findByRiderIdOrderByCreatedAtDesc(riderId).stream()
                .map(this::toBookingDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getDriverRequests(Long driverId) {
        return bookingRepository.findByDriverId(driverId).stream()
                .map(this::toBookingDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingDto accept(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getRide().getDriver().getId().equals(userId)) {
            throw new ForbiddenException("Only the driver can accept this booking");
        }
        if (!"PENDING".equals(booking.getStatus())) {
            throw new BadRequestException("Booking is not pending");
        }

        Ride ride = rideService.getEntity(booking.getRide().getId());
        if (ride.getAvailableSeats() < booking.getRequestedSeats()) {
            throw new ConflictException("Not enough seats available");
        }
        ride.setAvailableSeats(ride.getAvailableSeats() - booking.getRequestedSeats());
        rideRepository.save(ride);
        booking.setStatus("ACCEPTED");
        booking = bookingRepository.save(booking);
        return toBookingDto(booking);
    }

    @Transactional
    public BookingDto reject(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getRide().getDriver().getId().equals(userId)) {
            throw new ForbiddenException("Only the driver can reject this booking");
        }
        if (!"PENDING".equals(booking.getStatus())) {
            throw new BadRequestException("Booking is not pending");
        }
        booking.setStatus("REJECTED");
        booking = bookingRepository.save(booking);
        return toBookingDto(booking);
    }

    @Transactional
    public BookingDto cancel(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getRider().getId().equals(userId)) {
            throw new ForbiddenException("Only the rider can cancel this booking");
        }
        if (!"PENDING".equals(booking.getStatus()) && !"ACCEPTED".equals(booking.getStatus())) {
            throw new BadRequestException("Booking cannot be cancelled");
        }
        if ("ACCEPTED".equals(booking.getStatus())) {
            Ride ride = rideService.getEntity(booking.getRide().getId());
            ride.setAvailableSeats(ride.getAvailableSeats() + booking.getRequestedSeats());
            rideRepository.save(ride);
        }
        booking.setStatus("CANCELLED");
        booking = bookingRepository.save(booking);
        return toBookingDto(booking);
    }

    private BookingDto toBookingDto(Booking booking) {
        return new BookingDto(
                booking.getId(),
                DtoMapper.toRideDto(booking.getRide()),
                DtoMapper.toUserDto(booking.getRider()),
                booking.getRequestedSeats(),
                booking.getStatus(),
                booking.getMessage(),
                booking.getCreatedAt()
        );
    }
}
