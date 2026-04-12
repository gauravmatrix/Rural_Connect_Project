package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.OtpVerification;
import com.ruralconnect.backend.repository.OtpVerificationRepository;
import org.springframework.stereotype.Service;

@Service
public class OtpVerificationService extends AbstractCrudService<OtpVerification> {
    public OtpVerificationService(OtpVerificationRepository repository) {
        super(repository);
    }
}
