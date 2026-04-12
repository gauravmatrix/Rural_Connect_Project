package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.ReactionRequest;
import com.ruralconnect.backend.dto.response.ReactionResponse;
import com.ruralconnect.backend.entity.Reaction;
import org.springframework.stereotype.Component;

@Component
public class ReactionMapper implements EntityMapper<Reaction, ReactionRequest, ReactionResponse> {

    @Override
    public Reaction toEntity(ReactionRequest request) {
        Reaction entity = new Reaction();
        entity.setMessage(MapperSupport.messageRef(request.getMessageId()));
        entity.setUser(MapperSupport.userRef(request.getUserId()));
        entity.setType(request.getType());
        return entity;
    }

    @Override
    public ReactionResponse toResponse(Reaction entity) {
        ReactionResponse response = new ReactionResponse();
        response.setId(entity.getId());
        response.setMessageId(entity.getMessage() != null ? entity.getMessage().getId() : null);
        response.setUserId(entity.getUser() != null ? entity.getUser().getId() : null);
        response.setType(entity.getType());
        return response;
    }
}
