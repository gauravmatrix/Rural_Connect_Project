package com.ruralconnect.backend.common.api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiError {
    private String message;
    private int status;
}
