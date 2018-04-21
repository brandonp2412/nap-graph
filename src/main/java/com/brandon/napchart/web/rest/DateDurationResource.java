package com.brandon.napchart.web.rest;

import com.brandon.napchart.domain.DateDuration;
import com.brandon.napchart.repository.DateDurationRepository;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Nap.
 */
@RestController
@RequestMapping("/api")
public class DateDurationResource {

    private final Logger log = LoggerFactory.getLogger(DateDurationResource.class);

    private static final String ENTITY_NAME = "dayDuration";

    private final DateDurationRepository dateDurationRepository;

    public DateDurationResource(DateDurationRepository dayDurationRepository) {
        this.dateDurationRepository = dayDurationRepository;
    }

    @GetMapping("/day-durations")
    @Timed
    public ResponseEntity<List<DateDuration>> getAllDateDurations(Pageable pageable) {
        log.debug("REST request to get a page of DayDurations");
        Page<DateDuration> page = dateDurationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/date-durations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
