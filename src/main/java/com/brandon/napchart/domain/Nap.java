package com.brandon.napchart.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.brandon.napchart.domain.enumeration.DayType;

/**
 * A Nap.
 */
@Entity
@Table(name = "nap")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Nap implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "duration", nullable = false)
    private Integer duration;

    @NotNull
    @Min(value = 0)
    @Max(value = 10)
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Enumerated(EnumType.STRING)
    @Column(name = "day")
    private DayType day;

    @Column(name = "exercise")
    private Boolean exercise;

    @ManyToOne
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDuration() {
        return duration;
    }

    public Nap duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getRating() {
        return rating;
    }

    public Nap rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public DayType getDay() {
        return day;
    }

    public Nap day(DayType day) {
        this.day = day;
        return this;
    }

    public void setDay(DayType day) {
        this.day = day;
    }

    public Boolean isExercise() {
        return exercise;
    }

    public Nap exercise(Boolean exercise) {
        this.exercise = exercise;
        return this;
    }

    public void setExercise(Boolean exercise) {
        this.exercise = exercise;
    }

    public Person getPerson() {
        return person;
    }

    public Nap person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Nap nap = (Nap) o;
        if (nap.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nap.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Nap{" +
            "id=" + getId() +
            ", duration=" + getDuration() +
            ", rating=" + getRating() +
            ", day='" + getDay() + "'" +
            ", exercise='" + isExercise() + "'" +
            "}";
    }
}
