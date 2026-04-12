package com.ruralconnect.backend.repository;

import com.ruralconnect.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
	List<Message> findByCommunityIdOrderByCreatedAtAsc(Long communityId);
}
