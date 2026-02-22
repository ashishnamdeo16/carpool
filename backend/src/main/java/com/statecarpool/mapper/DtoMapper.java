package com.statecarpool.mapper;

import com.statecarpool.dto.RideDto;
import com.statecarpool.dto.UserDto;
import com.statecarpool.entity.Ride;
import com.statecarpool.entity.User;

public final class DtoMapper {

    private DtoMapper() {}

    public static UserDto toUserDto(User user) {
        if (user == null) return null;
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getAvatarUrl(),
                user.getCreatedAt()
        );
    }

    public static RideDto toRideDto(Ride ride) {
        if (ride == null) return null;
        return new RideDto(
                ride.getId(),
                toUserDto(ride.getDriver()),
                ride.getOrigin(),
                ride.getDestination(),
                ride.getDepartureTime(),
                ride.getAvailableSeats(),
                ride.getTotalSeats(),
                ride.getPricePerSeat(),
                ride.getDescription(),
                ride.getCarModel(),
                ride.getCarPlate(),
                ride.getStatus(),
                ride.getCreatedAt()
        );
    }
}
