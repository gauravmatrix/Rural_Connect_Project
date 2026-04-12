package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.ComplaintRequest;
import com.ruralconnect.backend.dto.response.ComplaintResponse;
import com.ruralconnect.backend.entity.Complaint;
import org.springframework.stereotype.Component;

@Component
public class ComplaintMapper implements EntityMapper<Complaint, ComplaintRequest, ComplaintResponse> {

    @Override
    public Complaint toEntity(ComplaintRequest request) {
        Complaint entity = new Complaint();
        entity.setCategory(request.getCategory());
        entity.setDescription(request.getDescription());
        entity.setMediaUrl(request.getMediaUrl());
        return entity;
    }

    @Override
    public ComplaintResponse toResponse(Complaint entity) {
        ComplaintResponse response = new ComplaintResponse();
        response.setId(entity.getId());
        response.setUserId(entity.getUser() != null ? entity.getUser().getId() : null);
        response.setCategory(entity.getCategory());
        response.setDescription(entity.getDescription());
        response.setMediaUrl(entity.getMediaUrl());
        response.setStatus(entity.getStatus());
        response.setCurrentHandler(entity.getCurrentHandler());
        response.setDeadline(entity.getDeadline());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }
}
