package com.ruralconnect.backend.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class ComplaintDetailsResponse {
    private ComplaintResponse complaint;
    private List<ComplaintStatusLogResponse> timeline;
}
