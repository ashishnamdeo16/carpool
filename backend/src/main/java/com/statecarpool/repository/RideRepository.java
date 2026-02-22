package com.statecarpool.repository;

import com.statecarpool.entity.Ride;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {

    @Query("SELECT r FROM Ride r WHERE r.status = 'ACTIVE' " +
           "AND r.availableSeats > 0 " +
           "AND (COALESCE(:origin, '') = '' OR LOWER(r.origin) LIKE LOWER(CONCAT('%', :origin, '%'))) " +
           "AND (COALESCE(:destination, '') = '' OR LOWER(r.destination) LIKE LOWER(CONCAT('%', :destination, '%'))) " +
           "AND (:minSeats IS NULL OR r.availableSeats >= :minSeats) " +
           "AND r.departureTime >= :now")
    Page<Ride> searchBase(@Param("origin") String origin,
                          @Param("destination") String destination,
                          @Param("minSeats") Integer minSeats,
                          @Param("now") LocalDateTime now,
                          Pageable pageable);

    @Query("SELECT r FROM Ride r WHERE r.status = 'ACTIVE' " +
           "AND r.availableSeats > 0 " +
           "AND (COALESCE(:origin, '') = '' OR LOWER(r.origin) LIKE LOWER(CONCAT('%', :origin, '%'))) " +
           "AND (COALESCE(:destination, '') = '' OR LOWER(r.destination) LIKE LOWER(CONCAT('%', :destination, '%'))) " +
           "AND r.departureTime >= :dateStart AND r.departureTime < :dateEnd " +
           "AND (:minSeats IS NULL OR r.availableSeats >= :minSeats) " +
           "AND r.departureTime >= :now")
    Page<Ride> searchWithDate(@Param("origin") String origin,
                              @Param("destination") String destination,
                              @Param("dateStart") LocalDateTime dateStart,
                              @Param("dateEnd") LocalDateTime dateEnd,
                              @Param("minSeats") Integer minSeats,
                              @Param("now") LocalDateTime now,
                              Pageable pageable);

    List<Ride> findByDriverIdOrderByDepartureTimeDesc(Long driverId);
}
