package com.statecarpool.service;

import com.statecarpool.dto.*;
import com.statecarpool.entity.Ride;
import com.statecarpool.entity.User;
import com.statecarpool.exception.ForbiddenException;
import com.statecarpool.exception.ResourceNotFoundException;
import com.statecarpool.mapper.DtoMapper;
import com.statecarpool.repository.RideRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final UserService userService;

    public RideService(RideRepository rideRepository, UserService userService) {
        this.rideRepository = rideRepository;
        this.userService = userService;
    }

    @Transactional
    public RideDto create(Long driverId, CreateRideRequest req) {
        User driver = userService.getEntity(driverId);
        Ride ride = new Ride();
        ride.setDriver(driver);
        ride.setOrigin(req.origin());
        ride.setDestination(req.destination());
        ride.setDepartureTime(req.departureTime());
        ride.setTotalSeats(req.totalSeats());
        ride.setAvailableSeats(req.totalSeats());
        ride.setPricePerSeat(req.pricePerSeat());
        ride.setDescription(req.description());
        ride.setCarModel(req.carModel());
        ride.setCarPlate(req.carPlate());
        ride.setStatus("ACTIVE");
        ride = rideRepository.save(ride);
        return DtoMapper.toRideDto(ride);
    }

    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<RideDto> search(String origin, String destination,
                                                                  LocalDate date, Integer seats,
                                                                  String sort, int page, int size) {
        LocalDateTime now = LocalDateTime.now();
        Sort.Order defaultOrder = new Sort.Order(Sort.Direction.ASC, "departureTime");
        if ("price".equalsIgnoreCase(sort)) {
            defaultOrder = new Sort.Order(Sort.Direction.ASC, "pricePerSeat");
        } else if ("price_desc".equalsIgnoreCase(sort)) {
            defaultOrder = new Sort.Order(Sort.Direction.DESC, "pricePerSeat");
        } else if ("departure_desc".equalsIgnoreCase(sort)) {
            defaultOrder = new Sort.Order(Sort.Direction.DESC, "departureTime");
        }
        var pageable = PageRequest.of(page, size, Sort.by(defaultOrder));
        var result = date != null
                ? rideRepository.searchWithDate(origin, destination, date.atStartOfDay(), date.plusDays(1).atStartOfDay(), seats, now, pageable)
                : rideRepository.searchBase(origin, destination, seats, now, pageable);
        return result.map(DtoMapper::toRideDto);
    }

    @Transactional(readOnly = true)
    public RideDto getById(Long id) {
        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));
        return DtoMapper.toRideDto(ride);
    }

    @Transactional
    public RideDto update(Long rideId, Long userId, UpdateRideRequest req) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));
        if (!ride.getDriver().getId().equals(userId)) {
            throw new ForbiddenException("Only the driver can update this ride");
        }
        if (!"ACTIVE".equals(ride.getStatus())) {
            throw new ForbiddenException("Cannot update a non-active ride");
        }
        Optional.ofNullable(req.origin()).ifPresent(ride::setOrigin);
        Optional.ofNullable(req.destination()).ifPresent(ride::setDestination);
        Optional.ofNullable(req.departureTime()).ifPresent(ride::setDepartureTime);
        if (req.totalSeats() != null) {
            int alreadyBooked = ride.getTotalSeats() - ride.getAvailableSeats();
            if (req.totalSeats() < alreadyBooked) {
                throw new com.statecarpool.exception.BadRequestException("Total seats cannot be less than already booked");
            }
            ride.setTotalSeats(req.totalSeats());
            ride.setAvailableSeats(req.totalSeats() - alreadyBooked);
        }
        Optional.ofNullable(req.pricePerSeat()).ifPresent(ride::setPricePerSeat);
        Optional.ofNullable(req.description()).ifPresent(ride::setDescription);
        Optional.ofNullable(req.carModel()).ifPresent(ride::setCarModel);
        Optional.ofNullable(req.carPlate()).ifPresent(ride::setCarPlate);
        ride = rideRepository.save(ride);
        return DtoMapper.toRideDto(ride);
    }

    public void delete(Long rideId, Long userId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));
        if (!ride.getDriver().getId().equals(userId)) {
            throw new ForbiddenException("Only the driver can delete this ride");
        }
        rideRepository.delete(ride);
    }

    @Transactional(readOnly = true)
    public List<RideDto> getMyRides(Long driverId) {
        return rideRepository.findByDriverIdOrderByDepartureTimeDesc(driverId).stream()
                .map(DtoMapper::toRideDto)
                .collect(Collectors.toList());
    }

    public Ride getEntity(Long id) {
        return rideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));
    }
}
