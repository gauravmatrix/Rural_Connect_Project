package com.ruralconnect.backend.chatbot.controller;

import com.ruralconnect.backend.chatbot.dto.request.ChatbotQueryRequest;
import com.ruralconnect.backend.chatbot.dto.response.ChatbotQueryResponse;
import com.ruralconnect.backend.chatbot.service.ChatbotService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/query")
    public ChatbotQueryResponse query(@Valid @RequestBody ChatbotQueryRequest request) {
        return new ChatbotQueryResponse(chatbotService.getReply(request.getQuery()));
    }
}
