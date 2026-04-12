package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommunityMemberRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long communityId;

    @NotBlank
    private String role;
}
