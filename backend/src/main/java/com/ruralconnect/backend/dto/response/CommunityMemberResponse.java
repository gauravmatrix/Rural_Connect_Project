package com.ruralconnect.backend.dto.response;

import lombok.Data;

@Data
public class CommunityMemberResponse {
    private Long id;
    private Long userId;
    private Long communityId;
    private String role;
}
