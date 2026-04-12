package com.ruralconnect.backend.auth.model;

import com.ruralconnect.backend.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PendingRegistration {
    private String fullName;
    private Integer age;
    private String email;
    private String phone;
    private String address;
    private String pincode;
    private String hashedPassword;
    private UserRole role;
    private String villageName;
    private String districtName;
    private String officeId;
}
