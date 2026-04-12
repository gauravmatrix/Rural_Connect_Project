package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.Community;
import com.ruralconnect.backend.repository.CommunityRepository;
import org.springframework.stereotype.Service;

@Service
public class CommunityService extends AbstractCrudService<Community> {
    public CommunityService(CommunityRepository repository) {
        super(repository);
    }
}
