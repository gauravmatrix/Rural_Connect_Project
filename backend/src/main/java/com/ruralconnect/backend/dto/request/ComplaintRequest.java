package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComplaintRequest {
    @NotBlank
    private String category;

    @NotBlank
    private String description;

    private String mediaUrl;
}
