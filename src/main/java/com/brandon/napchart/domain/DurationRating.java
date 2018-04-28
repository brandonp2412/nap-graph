package com.brandon.napchart.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "duration_rating")
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class DurationRating implements Serializable{

    @Id
    @Column
    private String id;

    @Column
    private Float duration;

    @Column
    private Float averageRating;

    @Column
    private String login;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Float getDuration() {
        return duration;
    }

    public void setDuration(Float duration) {
        this.duration = duration;
    }

    public Float getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Float averageRating) {
        this.averageRating = averageRating;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
