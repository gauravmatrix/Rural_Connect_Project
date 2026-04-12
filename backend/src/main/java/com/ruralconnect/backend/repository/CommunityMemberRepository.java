package com.ruralconnect.backend.repository;

import com.ruralconnect.backend.entity.CommunityMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {
	boolean existsByUserIdAndCommunityId(Long userId, Long communityId);
}
