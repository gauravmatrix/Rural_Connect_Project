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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints", indexes = {
        @Index(name = "idx_complaints_user_id", columnList = "user_id"),
        @Index(name = "idx_complaints_status", columnList = "status"),
        @Index(name = "idx_complaints_current_handler", columnList = "current_handler")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "media_url")
    private String mediaUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_handler", nullable = false)
    private UserRole currentHandler;

    @Column
    private LocalDateTime deadline;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
