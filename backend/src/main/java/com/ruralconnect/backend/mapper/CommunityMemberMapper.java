package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.CommunityMemberRequest;
import com.ruralconnect.backend.dto.response.CommunityMemberResponse;
import com.ruralconnect.backend.entity.CommunityMember;
import org.springframework.stereotype.Component;

@Component
public class CommunityMemberMapper implements EntityMapper<CommunityMember, CommunityMemberRequest, CommunityMemberResponse> {

    @Override
    public CommunityMember toEntity(CommunityMemberRequest request) {
        CommunityMember entity = new CommunityMember();
        entity.setUser(MapperSupport.userRef(request.getUserId()));
        entity.setCommunity(MapperSupport.communityRef(request.getCommunityId()));
        entity.setRole(request.getRole());
        return entity;
    }

    @Override
    public CommunityMemberResponse toResponse(CommunityMember entity) {
        CommunityMemberResponse response = new CommunityMemberResponse();
        response.setId(entity.getId());
        response.setUserId(entity.getUser() != null ? entity.getUser().getId() : null);
        response.setCommunityId(entity.getCommunity() != null ? entity.getCommunity().getId() : null);
        response.setRole(entity.getRole());
        return response;
    }
}
