package com.brandon.napchart.web.rest;

import com.brandon.napchart.domain.DayDuration;
import com.brandon.napchart.domain.Nap;
import com.brandon.napchart.domain.enumeration.DayType;
import com.brandon.napchart.repository.DayDurationRepository;
import com.brandon.napchart.repository.NapRepository;
import com.brandon.napchart.web.rest.util.PaginationUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Nap.
 */
@RestController
@RequestMapping("/api")
public class DayDurationResource {

    private final Logger log = LoggerFactory.getLogger(DayDurationResource.class);

    private static final String ENTITY_NAME = "dayDuration";

    private final DayDurationRepository dayDurationRepository;

    public DayDurationResource(DayDurationRepository dayDurationRepository) {
        this.dayDurationRepository = dayDurationRepository;
    }

    @GetMapping("/day-durations")
    @Timed
    public ResponseEntity<List<DayDuration>> getAllDayDurations(Pageable pageable) {
        log.debug("REST request to get a page of DayDurations");
        Page<DayDuration> page = dayDurationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/date-durations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/day-durations/{dayType}")
    @Timed
    public ResponseEntity<DayDuration> getDayDuration(@PathVariable DayType dayType) {
        log.debug("REST request to get DateDuration by date: {}", dayType);
        DayDuration dayDuration = dayDurationRepository.findOne(dayType);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dayDuration));
    }
}
