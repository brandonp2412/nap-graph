package com.brandon.napchart.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.brandon.napchart.web.rest.util.HeaderUtil;
import com.brandon.napchart.web.rest.util.PaginationUtil;
import com.brandon.napchart.web.rest.vm.ChartsSaveVM;
import com.brandon.napchart.web.rest.vm.ChartsLoadVM;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Dashboards.
 */
@RestController
@RequestMapping("/api/dashboards")
public class DashboardsResource {

    private final Logger log = LoggerFactory.getLogger(DashboardsResource.class);

    /**
     * POST  /charts : Save charts.
     *
     * @param chartsSaveVM the charts to save
     * @return the ResponseEntity with status 201 (Created) and with body the new ChartsSaveVM, or with status 400 (Bad Request) if the charts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/charts")
    @Timed
    public ResponseEntity postCharts(@RequestBody ChartsSaveVM chartsSaveVM) throws URISyntaxException {
        log.debug("REST request to save ChartsSaveVM : {}", chartsSaveVM);
        //TODO please code the save of page data.
        return ResponseEntity.ok().build();
    }
    /**
     * GET  /charts : get charts.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the chartsLoadVM, or with status 404 (Not Found)
     */
    @GetMapping("/charts")
    @Timed
    public ResponseEntity<ChartsLoadVM> getCharts() {
        log.debug("REST request to get ChartsLoadVM");
        ChartsLoadVM chartsLoadVM = null;
        //TODO please code the load referential data or any utils data to load the page.
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(chartsLoadVM));
    }


}
