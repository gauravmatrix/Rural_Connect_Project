package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RejectComplaintRequest {
    @NotBlank
    private String reason;
}
