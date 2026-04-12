package com.ruralconnect.backend.chatbot.service;

import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    public String getReply(String query) {
        String q = query == null ? "" : query.toLowerCase();

        if (q.contains("raise complaint") || q.contains("file complaint") || q.contains("register complaint")) {
            return "Go to Raise Complaint section, fill category and description, then submit.";
        }

        if (q.contains("track complaint") || q.contains("status") || q.contains("timeline")) {
            return "Open My Complaints or Track Complaint page to view current status and timeline.";
        }

        if (q.contains("login") || q.contains("sign in") || q.contains("otp")) {
            return "Use your registered email and password to login. For new account, complete OTP verification first.";
        }

        return "I can help with raising complaints, tracking status, and login guidance.";
    }
}
