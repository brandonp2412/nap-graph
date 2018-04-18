package com.brandon.napchart.repository;

import com.brandon.napchart.domain.Nap;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Nap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NapRepository extends JpaRepository<Nap, Long> {

}
