package com.ruralconnect.backend.auth.controller;

import com.ruralconnect.backend.auth.dto.request.LoginRequest;
import com.ruralconnect.backend.auth.dto.request.RegisterRequest;
import com.ruralconnect.backend.auth.dto.request.VerifyOtpRequest;
import com.ruralconnect.backend.auth.dto.response.LoginResponse;
import com.ruralconnect.backend.auth.dto.response.MessageResponse;
import com.ruralconnect.backend.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public MessageResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/verify-otp")
    public MessageResponse verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        return authService.verifyOtp(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
