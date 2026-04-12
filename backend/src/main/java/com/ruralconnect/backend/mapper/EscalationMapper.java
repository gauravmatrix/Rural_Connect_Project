package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.EscalationRequest;
import com.ruralconnect.backend.dto.response.EscalationResponse;
import com.ruralconnect.backend.entity.Escalation;
import org.springframework.stereotype.Component;

@Component
public class EscalationMapper implements EntityMapper<Escalation, EscalationRequest, EscalationResponse> {

    @Override
    public Escalation toEntity(EscalationRequest request) {
        Escalation entity = new Escalation();
        entity.setComplaint(MapperSupport.complaintRef(request.getComplaintId()));
        entity.setEscalatedAt(request.getEscalatedAt());
        entity.setReason(request.getReason());
        entity.setHandledBy(request.getHandledById() != null ? MapperSupport.userRef(request.getHandledById()) : null);
        entity.setStatus(request.getStatus());
        return entity;
    }

    @Override
    public EscalationResponse toResponse(Escalation entity) {
        EscalationResponse response = new EscalationResponse();
        response.setId(entity.getId());
        response.setComplaintId(entity.getComplaint() != null ? entity.getComplaint().getId() : null);
        response.setEscalatedAt(entity.getEscalatedAt());
        response.setReason(entity.getReason());
        response.setHandledById(entity.getHandledBy() != null ? entity.getHandledBy().getId() : null);
        response.setStatus(entity.getStatus());
        return response;
    }
}
