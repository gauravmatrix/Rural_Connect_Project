package com.ruralconnect.backend.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommunityResponse {
    private Long id;
    private String villageName;
    private LocalDateTime createdAt;
}
