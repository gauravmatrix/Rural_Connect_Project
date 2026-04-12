package com.ruralconnect.backend.dto.response;

import com.ruralconnect.backend.enums.ComplaintStatus;
import com.ruralconnect.backend.enums.UserRole;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintStatusLogResponse {
    private Long id;
    private Long complaintId;
    private ComplaintStatus status;
    private Long actorId;
    private UserRole actorRole;
    private String remarks;
    private LocalDateTime timestamp;
}
