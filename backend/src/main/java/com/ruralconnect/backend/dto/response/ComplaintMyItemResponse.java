package com.ruralconnect.backend.dto.response;

import com.ruralconnect.backend.enums.ComplaintStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintMyItemResponse {
    private Long id;
    private String category;
    private ComplaintStatus status;
    private LocalDateTime createdAt;
}
