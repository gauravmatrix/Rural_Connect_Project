package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommunityMessageRequest {
    @NotNull
    private Long communityId;

    @NotBlank
    private String message;

    private String mediaUrl;
}
