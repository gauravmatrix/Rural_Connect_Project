package com.ruralconnect.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ruralconnect.backend.entity.Community;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
