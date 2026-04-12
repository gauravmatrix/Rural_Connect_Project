package com.ruralconnect.backend.dto.response;

import com.ruralconnect.backend.enums.ComplaintStatus;
import com.ruralconnect.backend.enums.UserRole;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintResponse {
    private Long id;
    private Long userId;
    private String category;
    private String description;
    private String mediaUrl;
    private ComplaintStatus status;
    private UserRole currentHandler;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
