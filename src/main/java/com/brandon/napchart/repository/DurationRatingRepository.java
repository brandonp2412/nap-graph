package com.brandon.napchart.repository;

import com.brandon.napchart.domain.DurationRating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Nap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DurationRatingRepository extends JpaRepository<DurationRating, Integer> {
    @Query("select durationRating from DurationRating durationRating " +
        "inner join User user on user.login = durationRating.login " +
        "where durationRating.login = :login " +
        "order by durationRating.duration, durationRating.averageRating")
    Page<DurationRating> findAllByLogin(@Param("login") String login, Pageable pageable);
}
