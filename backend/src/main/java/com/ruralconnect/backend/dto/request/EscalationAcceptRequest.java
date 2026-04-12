package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EscalationAcceptRequest {
    @NotNull
    private LocalDateTime deadline;
}
