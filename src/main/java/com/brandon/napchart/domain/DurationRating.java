package com.brandon.napchart.domain;

import com.brandon.napchart.domain.enumeration.DayType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "duration_rating")
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class DurationRating implements Serializable{
    @Id
    @Column(name = "duration")
    private Integer duration;

    @Column(name = "average_rating")
    private Integer averageRating;

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Integer averageRating) {
        this.averageRating = averageRating;
    }
}
