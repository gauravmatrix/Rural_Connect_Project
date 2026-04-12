package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MessageRequest {
    @NotNull
    private Long communityId;

    @NotNull
    private Long userId;

    @NotBlank
    private String message;

    private String mediaUrl;
}
