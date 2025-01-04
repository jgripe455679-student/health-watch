package com.crawler.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "health_metrics")
public class HealthMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate recordDate;

    @Column(nullable = false)
    private Double heightMean;

    @Column(nullable = false)
    private Double heightMedian;

    @Column(nullable = false)
    private Double heightStd;

    @Column(nullable = false)
    private Double weightMean;

    @Column(nullable = false)
    private Double weightMedian;

    @Column(nullable = false)
    private Double weightStd;

    @Column(nullable = false)
    private Double systolicMean;

    @Column(nullable = false)
    private Double systolicMedian;

    @Column(nullable = false)
    private Double systolicStd;

    @Column(nullable = false)
    private Double diastolicMean;

    @Column(nullable = false)
    private Double diastolicMedian;

    @Column(nullable = false)
    private Double diastolicStd;
}
