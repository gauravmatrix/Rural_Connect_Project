package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommunityRequest {
    @NotBlank
    private String villageName;
}
