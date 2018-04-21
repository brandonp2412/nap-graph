package com.brandon.napchart.web.rest;

import com.brandon.napchart.security.AuthoritiesConstants;
import com.brandon.napchart.security.SecurityUtils;
import com.codahale.metrics.annotation.Timed;
import com.brandon.napchart.domain.Nap;

import com.brandon.napchart.repository.NapRepository;
import com.brandon.napchart.web.rest.errors.BadRequestAlertException;
import com.brandon.napchart.web.rest.util.HeaderUtil;
import com.brandon.napchart.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Nap.
 */
@RestController
@RequestMapping("/api")
public class NapResource {

    private final Logger log = LoggerFactory.getLogger(NapResource.class);

    private static final String ENTITY_NAME = "nap";

    private final NapRepository napRepository;

    public NapResource(NapRepository napRepository) {
        this.napRepository = napRepository;
    }

    /**
     * POST  /naps : Create a new nap.
     *
     * @param nap the nap to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nap, or with status 400 (Bad Request) if the nap has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/naps")
    @Timed
    public ResponseEntity<Nap> createNap(@Valid @RequestBody Nap nap) throws URISyntaxException {
        log.debug("REST request to save Nap : {}", nap);
        if (nap.getId() != null) {
            throw new BadRequestAlertException("A new nap cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nap result = napRepository.save(nap);
        return ResponseEntity.created(new URI("/api/naps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /naps : Updates an existing nap.
     *
     * @param nap the nap to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nap,
     * or with status 400 (Bad Request) if the nap is not valid,
     * or with status 500 (Internal Server Error) if the nap couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/naps")
    @Timed
    public ResponseEntity<Nap> updateNap(@Valid @RequestBody Nap nap) throws URISyntaxException {
        log.debug("REST request to update Nap : {}", nap);
        if (nap.getId() == null) {
            return createNap(nap);
        }
        Nap result = napRepository.save(nap);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nap.getId().toString()))
            .body(result);
    }

    /**
     * GET  /naps : get all the naps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of naps in body
     */
    @GetMapping("/naps")
    @Timed
    public ResponseEntity<List<Nap>> getAllNaps(Pageable pageable) throws Exception {
        if (!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN))
            return getAllNapsByUser(pageable);
        log.debug("REST request to get a page of Naps");
        Page<Nap> page = napRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/naps");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/naps/user")
    @Timed
    public ResponseEntity<List<Nap>> getAllNapsByUser(Pageable pageable) throws Exception {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();
        if (!login.isPresent())
            throw new Exception("No user to authenticate against");
        log.debug("REST request to get a page of Naps by user: {}", login);
        Page<Nap> page = napRepository.findAllByUser(login.get(), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/naps/user");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /naps/:id : get the "id" nap.
     *
     * @param id the id of the nap to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nap, or with status 404 (Not Found)
     */
    @GetMapping("/naps/{id}")
    @Timed
    public ResponseEntity<Nap> getNap(@PathVariable Long id) {
        log.debug("REST request to get Nap : {}", id);
        Nap nap = napRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nap));
    }

    /**
     * DELETE  /naps/:id : delete the "id" nap.
     *
     * @param id the id of the nap to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/naps/{id}")
    @Timed
    public ResponseEntity<Void> deleteNap(@PathVariable Long id) {
        log.debug("REST request to delete Nap : {}", id);
        napRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
