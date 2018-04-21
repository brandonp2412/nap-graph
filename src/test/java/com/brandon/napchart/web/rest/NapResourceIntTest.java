package com.brandon.napchart.web.rest;

import com.brandon.napchart.NapChartApp;

import com.brandon.napchart.domain.Nap;
import com.brandon.napchart.repository.NapRepository;
import com.brandon.napchart.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.brandon.napchart.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NapResource REST controller.
 *
 * @see NapResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NapChartApp.class)
public class NapResourceIntTest {

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    private static final Integer DEFAULT_RATING = 0;
    private static final Integer UPDATED_RATING = 1;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_EXERCISE = false;
    private static final Boolean UPDATED_EXERCISE = true;

    @Autowired
    private NapRepository napRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNapMockMvc;

    private Nap nap;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NapResource napResource = new NapResource(napRepository);
        this.restNapMockMvc = MockMvcBuilders.standaloneSetup(napResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nap createEntity(EntityManager em) {
        Nap nap = new Nap()
            .duration(DEFAULT_DURATION)
            .rating(DEFAULT_RATING)
            .date(DEFAULT_DATE)
            .exercise(DEFAULT_EXERCISE);
        return nap;
    }

    @Before
    public void initTest() {
        nap = createEntity(em);
    }

    @Test
    @Transactional
    public void createNap() throws Exception {
        int databaseSizeBeforeCreate = napRepository.findAll().size();

        // Create the Nap
        restNapMockMvc.perform(post("/api/naps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nap)))
            .andExpect(status().isCreated());

        // Validate the Nap in the database
        List<Nap> napList = napRepository.findAll();
        assertThat(napList).hasSize(databaseSizeBeforeCreate + 1);
        Nap testNap = napList.get(napList.size() - 1);
        assertThat(testNap.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testNap.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testNap.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testNap.isExercise()).isEqualTo(DEFAULT_EXERCISE);
    }

    @Test
    @Transactional
    public void createNapWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = napRepository.findAll().size();

        // Create the Nap with an existing ID
        nap.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNapMockMvc.perform(post("/api/naps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nap)))
            .andExpect(status().isBadRequest());

        // Validate the Nap in the database
        List<Nap> napList = napRepository.findAll();
        assertThat(napList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDurationIsRequired() throws Exception {
        int databaseSizeBeforeTest = napRepository.findAll().size();
        // set the field null
        nap.setDuration(null);

        // Create the Nap, which fails.

        restNapMockMvc.perform(post("/api/naps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nap)))
            .andExpect(status().isBadRequest());

        List<Nap> napList = napRepository.findAll();
        assertThat(napList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRatingIsRequired() throws Exception {
        int databaseSizeBeforeTest = napRepository.findAll().size();
        // set the field null
        nap.setRating(null);

        // Create the Nap, which fails.

        restNapMockMvc.perform(post("/api/naps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nap)))
            .andExpect(status().isBadRequest());

        List<Nap> napList = napRepository.findAll();
        assertThat(napList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNaps() throws Exception {
        // Initialize the database
        napRepository.saveAndFlush(nap);

        // Get all the napList
        restNapMockMvc.perform(get("/api/naps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nap.getId().intValue())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].exercise").value(hasItem(DEFAULT_EXERCISE.booleanValue())));
    }

    @Test
    @Transactional
    public void getNap() throws Exception {
        // Initialize the database
        napRepository.saveAndFlush(nap);

        // Get the nap
        restNapMockMvc.perform(get("/api/naps/{id}", nap.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nap.getId().intValue()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.exercise").value(DEFAULT_EXERCISE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNap() throws Exception {
        // Get the nap
        restNapMockMvc.perform(get("/api/naps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNap() throws Exception {
        // Initialize the database
        napRepository.saveAndFlush(nap);
        int databaseSizeBeforeUpdate = napRepository.findAll().size();

        // Update the nap
        Nap updatedNap = napRepository.findOne(nap.getId());
        // Disconnect from session so that the updates on updatedNap are not directly saved in db
        em.detach(updatedNap);
        updatedNap
            .duration(UPDATED_DURATION)
            .rating(UPDATED_RATING)
            .date(UPDATED_DATE)
            .exercise(UPDATED_EXERCISE);

        restNapMockMvc.perform(put("/api/naps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNap)))
            .andExpect(status().isOk());

        // Validate the Nap in the database
        List<Nap> napList = napRepository.findAll();
        assertThat(napList).hasSize(databaseSizeBeforeUpdate);
        Nap testNap = napList.get(napList.size() - 1);
        assertThat(testNap.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testNap.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testNap.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testNap.isExercise()).isEqualTo(UPDATED_EXERCISE);
    }

    @Test
    @Transactional
    public void updateNonExistingNap() throws Exception {
        int databaseSizeBeforeUpdate = napRepository.findAll().size();

        // Create the Nap

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNapMockMvc.perform(put("/api/naps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nap)))
            .andExpect(status().isCreated());

        // Validate the Nap in the database
        List<Nap> napList = napRepository.findAll();
        assertThat(napList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNap() throws Exception {
        // Initialize the database
        napRepository.saveAndFlush(nap);
        int databaseSizeBeforeDelete = napRepository.findAll().size();

        // Get the nap
        restNapMockMvc.perform(delete("/api/naps/{id}", nap.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nap> napList = napRepository.findAll();
        assertThat(napList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nap.class);
        Nap nap1 = new Nap();
        nap1.setId(1L);
        Nap nap2 = new Nap();
        nap2.setId(nap1.getId());
        assertThat(nap1).isEqualTo(nap2);
        nap2.setId(2L);
        assertThat(nap1).isNotEqualTo(nap2);
        nap1.setId(null);
        assertThat(nap1).isNotEqualTo(nap2);
    }
}
