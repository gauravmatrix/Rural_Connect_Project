package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EscalationRequest {
    @NotNull
    private Long complaintId;

    @NotNull
    private LocalDateTime escalatedAt;

    private String reason;

    private Long handledById;

    @NotBlank
    private String status;
}
