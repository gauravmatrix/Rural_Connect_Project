package com.ruralconnect.backend.dto.response;

import lombok.Data;

@Data
public class ReactionResponse {
    private Long id;
    private Long messageId;
    private Long userId;
    private String type;
}
