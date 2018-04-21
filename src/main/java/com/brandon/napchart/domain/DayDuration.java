package com.brandon.napchart.domain;

import javax.persistence.Entity;

import com.brandon.napchart.domain.enumeration.DayType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "day_by_duration")
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class DayDuration implements Serializable{
    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "date")
    private DayType day;

    @Column(name = "total_duration")
    private Integer totalDuration;

    public Integer getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(Integer totalDuration) {
        this.totalDuration = totalDuration;
    }

    public DayType getDay() {
        return day;
    }

    public void setDay(DayType day) {
        this.day = day;
    }
}
