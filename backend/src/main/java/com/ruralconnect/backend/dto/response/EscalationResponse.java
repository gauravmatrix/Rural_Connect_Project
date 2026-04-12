package com.ruralconnect.backend.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EscalationResponse {
    private Long id;
    private Long complaintId;
    private LocalDateTime escalatedAt;
    private String reason;
    private Long handledById;
    private String status;
}
