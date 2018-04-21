package com.brandon.napchart.web.rest;

import com.brandon.napchart.domain.DurationRating;
import com.brandon.napchart.repository.DurationRatingRepository;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Nap.
 */
@RestController
@RequestMapping("/api")
public class DurationRatingResource {

    private final Logger log = LoggerFactory.getLogger(DurationRatingResource.class);

    private static final String ENTITY_NAME = "durationRating";

    private final DurationRatingRepository durationRatingResource;

    public DurationRatingResource(DurationRatingRepository durationRatingResource) {
        this.durationRatingResource = durationRatingResource;
    }

    @GetMapping("/duration-ratings")
    @Timed
    public ResponseEntity<List<DurationRating>> getAllDurationRatings(Pageable pageable) {
        log.debug("REST request to get a page of DurationRatings");
        Page<DurationRating> page = durationRatingResource.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/duration-ratings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/duration-ratings/{rating}")
    @Timed
    public ResponseEntity<DurationRating> getDurationRating(@PathVariable Integer rating) {
        log.debug("REST request to get DurationRating by rating: {}", rating);
        DurationRating dayDuration = durationRatingResource.findOne(rating);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dayDuration));
    }
}