package com.ruralconnect.backend.repository;

import com.ruralconnect.backend.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
}
