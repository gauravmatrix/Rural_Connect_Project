package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.CommunityMember;
import com.ruralconnect.backend.repository.CommunityMemberRepository;
import org.springframework.stereotype.Service;

@Service
public class CommunityMemberService extends AbstractCrudService<CommunityMember> {
    public CommunityMemberService(CommunityMemberRepository repository) {
        super(repository);
    }
}
