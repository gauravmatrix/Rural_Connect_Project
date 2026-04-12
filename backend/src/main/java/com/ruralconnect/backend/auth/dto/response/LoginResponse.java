package com.ruralconnect.backend.auth.dto.response;

import com.ruralconnect.backend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String tokenType;
    private Long userId;
    private UserRole role;
}
