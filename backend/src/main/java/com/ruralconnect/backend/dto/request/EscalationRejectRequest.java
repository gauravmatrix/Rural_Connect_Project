package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EscalationRejectRequest {
    @NotBlank
    private String reason;
}
