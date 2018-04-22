package com.brandon.napchart.repository;

import com.brandon.napchart.domain.Nap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the Nap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NapRepository extends JpaRepository<Nap, Long> {
    @Query("select nap from Nap nap where " +
        "nap.user.login = :login")
    Page<Nap> findAllByUser(@Param("login") String login, Pageable pageable);

    @Query("select nap, avg(nap.rating) from Nap nap inner join " +
        "User user on user.id = nap.user.id " +
        "where user.login = :login " +
        "group by nap.duration, nap.user")
    ResponseEntity<Nap> findAllAverageRatings(@Param("login") String login);
}
