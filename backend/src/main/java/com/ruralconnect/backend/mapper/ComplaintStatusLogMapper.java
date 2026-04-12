package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.ComplaintStatusLogRequest;
import com.ruralconnect.backend.dto.response.ComplaintStatusLogResponse;
import com.ruralconnect.backend.entity.ComplaintStatusLog;
import org.springframework.stereotype.Component;

@Component
public class ComplaintStatusLogMapper implements EntityMapper<ComplaintStatusLog, ComplaintStatusLogRequest, ComplaintStatusLogResponse> {

    @Override
    public ComplaintStatusLog toEntity(ComplaintStatusLogRequest request) {
        ComplaintStatusLog entity = new ComplaintStatusLog();
        entity.setComplaint(MapperSupport.complaintRef(request.getComplaintId()));
        entity.setStatus(request.getStatus());
        entity.setActor(MapperSupport.userRef(request.getActorId()));
        entity.setActorRole(request.getActorRole());
        entity.setRemarks(request.getRemarks());
        entity.setTimestamp(request.getTimestamp());
        return entity;
    }

    @Override
    public ComplaintStatusLogResponse toResponse(ComplaintStatusLog entity) {
        ComplaintStatusLogResponse response = new ComplaintStatusLogResponse();
        response.setId(entity.getId());
        response.setComplaintId(entity.getComplaint() != null ? entity.getComplaint().getId() : null);
        response.setStatus(entity.getStatus());
        response.setActorId(entity.getActor() != null ? entity.getActor().getId() : null);
        response.setActorRole(entity.getActorRole());
        response.setRemarks(entity.getRemarks());
        response.setTimestamp(entity.getTimestamp());
        return response;
    }
}
