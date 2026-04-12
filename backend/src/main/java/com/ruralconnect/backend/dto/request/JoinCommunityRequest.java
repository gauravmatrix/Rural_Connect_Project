package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JoinCommunityRequest {
    @NotNull
    private Long communityId;

    private String role;
}
