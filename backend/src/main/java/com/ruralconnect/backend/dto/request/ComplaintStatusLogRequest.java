package com.ruralconnect.backend.dto.request;

import com.ruralconnect.backend.enums.ComplaintStatus;
import com.ruralconnect.backend.enums.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintStatusLogRequest {
    @NotNull
    private Long complaintId;

    @NotNull
    private ComplaintStatus status;

    @NotNull
    private Long actorId;

    @NotNull
    private UserRole actorRole;

    private String remarks;

    @NotNull
    private LocalDateTime timestamp;
}
