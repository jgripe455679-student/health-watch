package com.crawler.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "tbl_records")
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate recordDate;

    @ManyToOne
    private Profile profile;

    @ManyToOne
    private Service service;

    @Column(nullable = true)
    private Integer height;

    @Column(nullable = true)
    private Integer weight;
    
    @Column(nullable = true)
    private String bloodPressure;

    @Column(nullable = true)
    private Integer pulseRate;

    @Column(nullable = true)
    private String healthCondition;
    
    @Column(nullable = true)
    private String medicalProblem;

    @Column(nullable = true)
    private String diagnosis;

    @Column(nullable = true)
    private String medication;

    @Column(nullable = true)
    private String notes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    private User createdBy;

    @Column(nullable = true)
    private LocalDateTime updatedAt;

    @ManyToOne(optional = true)
    @JoinColumn(nullable = true)
    private User updatedBy;

    @PrePersist
    public void onCreate() {
        this.recordDate = LocalDate.now();
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
