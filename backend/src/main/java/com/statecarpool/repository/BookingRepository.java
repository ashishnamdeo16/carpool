package com.statecarpool.repository;

import com.statecarpool.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRiderIdOrderByCreatedAtDesc(Long riderId);

    @Query("SELECT b FROM Booking b WHERE b.ride.driver.id = :driverId ORDER BY b.createdAt DESC")
    List<Booking> findByDriverId(@Param("driverId") Long driverId);
}
