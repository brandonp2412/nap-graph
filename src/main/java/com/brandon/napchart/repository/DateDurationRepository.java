package com.brandon.napchart.repository;

import com.brandon.napchart.domain.DateDuration;
import com.brandon.napchart.domain.User;
import com.brandon.napchart.domain.enumeration.DayType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;


/**
 * Spring Data JPA repository for the Nap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DateDurationRepository extends JpaRepository<DateDuration, LocalDate> {
    @Query("select dateDuration from DateDuration dateDuration " +
        "inner join User user on user.login = dateDuration.login " +
        "where user.login = :login " +
        "order by dateDuration.date, dateDuration.totalDuration")
    Page<DateDuration> findAllByLogin(@Param("login") String login, Pageable pageable);
}
