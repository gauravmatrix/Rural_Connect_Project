package com.ruralconnect.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OtpVerificationRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String otp;

    @NotNull
    private LocalDateTime expiresAt;
}
