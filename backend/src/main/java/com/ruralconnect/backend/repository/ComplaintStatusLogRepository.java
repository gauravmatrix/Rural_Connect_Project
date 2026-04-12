package com.ruralconnect.backend.repository;

import com.ruralconnect.backend.entity.ComplaintStatusLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintStatusLogRepository extends JpaRepository<ComplaintStatusLog, Long> {
	List<ComplaintStatusLog> findByComplaintIdOrderByTimestampAsc(Long complaintId);
}
