package com.brandon.napchart.repository;

import com.brandon.napchart.domain.Nap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Nap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NapRepository extends JpaRepository<Nap, Long> {

    @Query("select nap from Nap nap where nap.user.login = ?#{principal.username}")
    Page<Nap> findByUserIsCurrentUser(Pageable pageable);

}
