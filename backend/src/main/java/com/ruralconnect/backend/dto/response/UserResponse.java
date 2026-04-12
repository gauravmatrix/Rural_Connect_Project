package com.ruralconnect.backend.dto.response;

import com.ruralconnect.backend.enums.UserRole;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private Long id;
    private String fullName;
    private Integer age;
    private String email;
    private String phone;
    private String address;
    private String pincode;
    private UserRole role;
    private String villageName;
    private String districtName;
    private String officeId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
