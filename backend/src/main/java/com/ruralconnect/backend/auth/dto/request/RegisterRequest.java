package com.ruralconnect.backend.auth.dto.request;

import com.ruralconnect.backend.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    private String fullName;

    @NotNull
    @Min(18)
    @Max(120)
    private Integer age;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits")
    private String pincode;

    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull
    private UserRole role;

    private String villageName;
    private String districtName;
    private String officeId;
}
