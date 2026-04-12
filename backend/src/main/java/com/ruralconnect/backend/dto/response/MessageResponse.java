package com.ruralconnect.backend.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageResponse {
    private Long id;
    private Long communityId;
    private Long userId;
    private String message;
    private String mediaUrl;
    private LocalDateTime createdAt;
}
