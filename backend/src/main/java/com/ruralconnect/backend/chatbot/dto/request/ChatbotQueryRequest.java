package com.ruralconnect.backend.chatbot.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatbotQueryRequest {
    @NotBlank
    private String query;
}
