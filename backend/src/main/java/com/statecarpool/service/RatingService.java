package com.statecarpool.service;

import com.statecarpool.dto.CreateRatingRequest;
import com.statecarpool.dto.RatingsSummaryDto;
import com.statecarpool.entity.Booking;
import com.statecarpool.entity.Rating;
import com.statecarpool.entity.Ride;
import com.statecarpool.entity.User;
import com.statecarpool.exception.BadRequestException;
import com.statecarpool.exception.ForbiddenException;
import com.statecarpool.exception.ResourceNotFoundException;
import com.statecarpool.repository.BookingRepository;
import com.statecarpool.repository.RatingRepository;
import com.statecarpool.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final RideRepository rideRepository;
    private final BookingRepository bookingRepository;
    private final UserService userService;

    public RatingService(RatingRepository ratingRepository, RideRepository rideRepository,
                         BookingRepository bookingRepository, UserService userService) {
        this.ratingRepository = ratingRepository;
        this.rideRepository = rideRepository;
        this.bookingRepository = bookingRepository;
        this.userService = userService;
    }

    public Rating create(Long fromUserId, CreateRatingRequest req) {
        Ride ride = rideRepository.findById(req.rideId())
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));
        User fromUser = userService.getEntity(fromUserId);
        User toUser = userService.getEntity(req.toUserId());

        if (fromUserId.equals(req.toUserId())) {
            throw new BadRequestException("Cannot rate yourself");
        }

        boolean participatedTogether = false;
        if (ride.getDriver().getId().equals(req.toUserId())) {
            // Rating the driver - fromUser must be a rider with ACCEPTED booking
            participatedTogether = bookingRepository.findByRiderIdOrderByCreatedAtDesc(fromUserId).stream()
                    .anyMatch(b -> b.getRide().getId().equals(req.rideId()) && "ACCEPTED".equals(b.getStatus()));
        } else if (ride.getDriver().getId().equals(fromUserId)) {
            // Rating a rider - fromUser is driver, toUser must be rider with ACCEPTED booking
            participatedTogether = bookingRepository.findByRiderIdOrderByCreatedAtDesc(req.toUserId()).stream()
                    .anyMatch(b -> b.getRide().getId().equals(req.rideId()) && "ACCEPTED".equals(b.getStatus()));
        }
        if (!participatedTogether) {
            throw new ForbiddenException("You can only rate users after an ACCEPTED ride together");
        }

        List<Rating> existing = ratingRepository.findByRideAndFromAndTo(req.rideId(), fromUserId, req.toUserId());
        if (!existing.isEmpty()) {
            throw new BadRequestException("You have already rated this user for this ride");
        }

        Rating rating = new Rating();
        rating.setRide(ride);
        rating.setFromUser(fromUser);
        rating.setToUser(toUser);
        rating.setScore(req.score());
        rating.setComment(req.comment());
        return ratingRepository.save(rating);
    }

    public RatingsSummaryDto getRatingsSummary(Long userId) {
        userService.getEntity(userId); // ensure user exists
        Double avg = ratingRepository.findAverageScoreByToUserId(userId);
        Long count = ratingRepository.countByToUserId(userId);
        return new RatingsSummaryDto(userId, avg != null ? Math.round(avg * 10.0) / 10.0 : null, count != null ? count : 0L);
    }
}
