package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.OtpVerificationRequest;
import com.ruralconnect.backend.dto.response.OtpVerificationResponse;
import com.ruralconnect.backend.entity.OtpVerification;
import org.springframework.stereotype.Component;

@Component
public class OtpVerificationMapper implements EntityMapper<OtpVerification, OtpVerificationRequest, OtpVerificationResponse> {

    @Override
    public OtpVerification toEntity(OtpVerificationRequest request) {
        OtpVerification entity = new OtpVerification();
        entity.setEmail(request.getEmail());
        entity.setOtp(request.getOtp());
        entity.setExpiresAt(request.getExpiresAt());
        return entity;
    }

    @Override
    public OtpVerificationResponse toResponse(OtpVerification entity) {
        OtpVerificationResponse response = new OtpVerificationResponse();
        response.setId(entity.getId());
        response.setEmail(entity.getEmail());
        response.setOtp(entity.getOtp());
        response.setExpiresAt(entity.getExpiresAt());
        return response;
    }
}
