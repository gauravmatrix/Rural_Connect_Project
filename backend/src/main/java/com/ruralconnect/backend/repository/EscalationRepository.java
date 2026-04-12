package com.ruralconnect.backend.repository;

import com.ruralconnect.backend.entity.Escalation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EscalationRepository extends JpaRepository<Escalation, Long> {
}
