package com.brandon.napchart.domain;

import javax.persistence.Entity;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class NapStats implements Serializable{

}
