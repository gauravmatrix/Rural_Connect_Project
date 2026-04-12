package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.MessageRequest;
import com.ruralconnect.backend.dto.response.MessageResponse;
import com.ruralconnect.backend.entity.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper implements EntityMapper<Message, MessageRequest, MessageResponse> {

    @Override
    public Message toEntity(MessageRequest request) {
        Message entity = new Message();
        entity.setCommunity(MapperSupport.communityRef(request.getCommunityId()));
        entity.setUser(MapperSupport.userRef(request.getUserId()));
        entity.setMessage(request.getMessage());
        entity.setMediaUrl(request.getMediaUrl());
        return entity;
    }

    @Override
    public MessageResponse toResponse(Message entity) {
        MessageResponse response = new MessageResponse();
        response.setId(entity.getId());
        response.setCommunityId(entity.getCommunity() != null ? entity.getCommunity().getId() : null);
        response.setUserId(entity.getUser() != null ? entity.getUser().getId() : null);
        response.setMessage(entity.getMessage());
        response.setMediaUrl(entity.getMediaUrl());
        response.setCreatedAt(entity.getCreatedAt());
        return response;
    }
}
