package com.crawler.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
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
@Table(name = "tbl_profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    private String lastName;

    private String suffix;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String maritalStatus;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    @Pattern(regexp = "^09\\d{9}$", message = "Invalid mobile number format")
    private String mobileNumber;

    @Column(nullable = true)
    private String occupation;

    @Column(nullable = true)
    private String educationalBackground;

    @Column(nullable = true)
    private Integer householdSize;

    @Column(nullable = true)
    private String incomeBracket;

    @OneToMany(mappedBy = "profile")
    private Set<Record> records;

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
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(lastName.toUpperCase());
        sb.append(", ");
        sb.append(firstName.toUpperCase());

        if (middleName != null && !middleName.isEmpty()) {
            sb.append(" ");
            sb.append(middleName.toUpperCase());
        }

        if (suffix != null && !suffix.isEmpty()) {
            sb.append(" ");
            sb.append(suffix.toUpperCase());
        }
        return sb.toString();
    }
}
