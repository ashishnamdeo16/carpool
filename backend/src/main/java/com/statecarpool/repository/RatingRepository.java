package com.statecarpool.repository;

import com.statecarpool.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByToUserIdOrderByCreatedAtDesc(Long toUserId);

    @Query("SELECT AVG(r.score) FROM Rating r WHERE r.toUser.id = :userId")
    Double findAverageScoreByToUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(r) FROM Rating r WHERE r.toUser.id = :userId")
    Long countByToUserId(@Param("userId") Long userId);

    @Query("SELECT r FROM Rating r WHERE r.ride.id = :rideId AND r.fromUser.id = :fromUserId AND r.toUser.id = :toUserId")
    List<Rating> findByRideAndFromAndTo(@Param("rideId") Long rideId,
                                        @Param("fromUserId") Long fromUserId,
                                        @Param("toUserId") Long toUserId);
}
