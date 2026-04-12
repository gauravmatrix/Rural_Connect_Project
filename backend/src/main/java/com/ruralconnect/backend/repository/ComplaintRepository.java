package com.ruralconnect.backend.repository;

import com.ruralconnect.backend.entity.Complaint;
import com.ruralconnect.backend.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
	List<Complaint> findByUserIdOrderByCreatedAtDesc(Long userId);

	List<Complaint> findByDeadlineBeforeAndStatusNotIn(LocalDateTime currentTime, List<ComplaintStatus> excludedStatuses);
}
