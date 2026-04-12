package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.NotificationRequest;
import com.ruralconnect.backend.dto.response.NotificationResponse;
import com.ruralconnect.backend.entity.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper implements EntityMapper<Notification, NotificationRequest, NotificationResponse> {

    @Override
    public Notification toEntity(NotificationRequest request) {
        Notification entity = new Notification();
        entity.setUser(MapperSupport.userRef(request.getUserId()));
        entity.setMessage(request.getMessage());
        entity.setIsRead(Boolean.TRUE.equals(request.getIsRead()));
        return entity;
    }

    @Override
    public NotificationResponse toResponse(Notification entity) {
        NotificationResponse response = new NotificationResponse();
        response.setId(entity.getId());
        response.setUserId(entity.getUser() != null ? entity.getUser().getId() : null);
        response.setMessage(entity.getMessage());
        response.setIsRead(entity.getIsRead());
        response.setCreatedAt(entity.getCreatedAt());
        return response;
    }
}
