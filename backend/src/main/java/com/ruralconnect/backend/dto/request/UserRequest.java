package com.ruralconnect.backend.dto.request;

import com.ruralconnect.backend.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserRequest {

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
    @Pattern(regexp = "^[0-9]{10}$", message = "phone must be 10 digits")
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    @Pattern(regexp = "^[0-9]{6}$", message = "pincode must be 6 digits")
    private String pincode;

    @NotBlank
    private String password;

    @NotNull
    private UserRole role;

    private String villageName;
    private String districtName;
    private String officeId;
}
