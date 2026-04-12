package com.ruralconnect.backend.entity;

import com.ruralconnect.backend.enums.ComplaintStatus;
import com.ruralconnect.backend.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_status_log", indexes = {
        @Index(name = "idx_log_complaint_id", columnList = "complaint_id"),
        @Index(name = "idx_log_actor_id", columnList = "actor_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintStatusLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "actor_id", nullable = false)
    private User actor;

    @Enumerated(EnumType.STRING)
    @Column(name = "actor_role", nullable = false)
    private UserRole actorRole;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
