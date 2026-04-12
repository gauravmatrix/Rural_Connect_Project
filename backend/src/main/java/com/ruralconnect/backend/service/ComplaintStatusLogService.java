package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.ComplaintStatusLog;
import com.ruralconnect.backend.repository.ComplaintStatusLogRepository;
import org.springframework.stereotype.Service;

@Service
public class ComplaintStatusLogService extends AbstractCrudService<ComplaintStatusLog> {
    public ComplaintStatusLogService(ComplaintStatusLogRepository repository) {
        super(repository);
    }
}
