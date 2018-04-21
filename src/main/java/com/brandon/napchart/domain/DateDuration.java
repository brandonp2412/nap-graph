package com.brandon.napchart.domain;

import javax.persistence.Entity;

import com.brandon.napchart.domain.enumeration.DayType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "date_duration")
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class DateDuration implements Serializable{
    @Id
    @Column(name = "date")
    private LocalDate date;

    @Column(name = "total_duration")
    private Integer totalDuration;

    public Integer getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(Integer totalDuration) {
        this.totalDuration = totalDuration;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDay(LocalDate date) {
        this.date = date;
    }
}
