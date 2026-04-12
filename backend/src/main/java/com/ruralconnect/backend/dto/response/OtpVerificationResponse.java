package com.ruralconnect.backend.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OtpVerificationResponse {
    private Long id;
    private String email;
    private String otp;
    private LocalDateTime expiresAt;
}
