package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.CommunityRequest;
import com.ruralconnect.backend.dto.response.CommunityResponse;
import com.ruralconnect.backend.entity.Community;
import org.springframework.stereotype.Component;

@Component
public class CommunityMapper implements EntityMapper<Community, CommunityRequest, CommunityResponse> {

    @Override
    public Community toEntity(CommunityRequest request) {
        Community entity = new Community();
        entity.setVillageName(request.getVillageName());
        return entity;
    }

    @Override
    public CommunityResponse toResponse(Community entity) {
        CommunityResponse response = new CommunityResponse();
        response.setId(entity.getId());
        response.setVillageName(entity.getVillageName());
        response.setCreatedAt(entity.getCreatedAt());
        return response;
    }
}
