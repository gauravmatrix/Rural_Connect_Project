package com.ruralconnect.backend.service;

import com.ruralconnect.backend.common.exception.BadRequestException;
import com.ruralconnect.backend.common.exception.ResourceNotFoundException;
import com.ruralconnect.backend.common.exception.UnauthorizedException;
import com.ruralconnect.backend.entity.Complaint;
import com.ruralconnect.backend.entity.ComplaintStatusLog;
import com.ruralconnect.backend.entity.Escalation;
import com.ruralconnect.backend.entity.User;
import com.ruralconnect.backend.enums.ComplaintStatus;
import com.ruralconnect.backend.enums.UserRole;
import com.ruralconnect.backend.repository.ComplaintRepository;
import com.ruralconnect.backend.repository.ComplaintStatusLogRepository;
import com.ruralconnect.backend.repository.EscalationRepository;
import com.ruralconnect.backend.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EscalationService extends AbstractCrudService<Escalation> {

    private final EscalationRepository escalationRepository;
    private final ComplaintRepository complaintRepository;
    private final ComplaintStatusLogRepository complaintStatusLogRepository;
    private final UserRepository userRepository;

    public EscalationService(EscalationRepository repository,
                             ComplaintRepository complaintRepository,
                             ComplaintStatusLogRepository complaintStatusLogRepository,
                             UserRepository userRepository) {
        super(repository);
        this.escalationRepository = repository;
        this.complaintRepository = complaintRepository;
        this.complaintStatusLogRepository = complaintStatusLogRepository;
        this.userRepository = userRepository;
    }

    @Scheduled(fixedDelayString = "${app.escalation.scheduler-delay-ms:60000}")
    @Transactional
    public void autoEscalateOverdueComplaints() {
        List<Complaint> overdueComplaints = complaintRepository.findByDeadlineBeforeAndStatusNotIn(
                LocalDateTime.now(),
                List.of(ComplaintStatus.RESOLVED, ComplaintStatus.ESCALATED)
        );

        if (overdueComplaints.isEmpty()) {
            return;
        }

        User districtOfficer = userRepository.findFirstByRole(UserRole.DISTRICT).orElse(null);

        for (Complaint complaint : overdueComplaints) {
            complaint.setStatus(ComplaintStatus.ESCALATED);
            complaint.setCurrentHandler(UserRole.DISTRICT);
            complaintRepository.save(complaint);

            Escalation escalation = new Escalation();
            escalation.setComplaint(complaint);
            escalation.setEscalatedAt(LocalDateTime.now());
            escalation.setReason("Auto escalation due to deadline breach");
            escalation.setHandledBy(districtOfficer);
            escalation.setStatus("ESCALATED");
            escalationRepository.save(escalation);

            ComplaintStatusLog log = new ComplaintStatusLog();
            log.setComplaint(complaint);
            log.setStatus(ComplaintStatus.ESCALATED);
            log.setActor(complaint.getUser());
            log.setActorRole(complaint.getUser().getRole());
            log.setRemarks("Auto-escalated due to deadline breach");
            log.setTimestamp(LocalDateTime.now());
            complaintStatusLogRepository.save(log);
        }
    }

    @Transactional
    public Escalation acceptEscalation(Long escalationId, Long actorId, LocalDateTime deadline) {
        Escalation escalation = getEscalationOrThrow(escalationId);
        User districtActor = getDistrictActorOrThrow(actorId);

        if (!"ESCALATED".equalsIgnoreCase(escalation.getStatus())) {
            throw new BadRequestException("Invalid status transition");
        }

        Complaint complaint = escalation.getComplaint();
        complaint.setCurrentHandler(UserRole.DISTRICT);
        complaint.setDeadline(deadline);
        complaintRepository.save(complaint);

        escalation.setHandledBy(districtActor);
        escalation.setStatus("ACCEPTED");
        Escalation savedEscalation = escalationRepository.save(escalation);

        ComplaintStatusLog log = new ComplaintStatusLog();
        log.setComplaint(complaint);
        log.setStatus(ComplaintStatus.ESCALATED);
        log.setActor(districtActor);
        log.setActorRole(UserRole.DISTRICT);
        log.setRemarks("Escalation accepted; deadline reset");
        log.setTimestamp(LocalDateTime.now());
        complaintStatusLogRepository.save(log);

        return savedEscalation;
    }

    @Transactional
    public Escalation rejectEscalation(Long escalationId, Long actorId, String reason) {
        Escalation escalation = getEscalationOrThrow(escalationId);
        User districtActor = getDistrictActorOrThrow(actorId);

        if (!"ESCALATED".equalsIgnoreCase(escalation.getStatus())) {
            throw new BadRequestException("Invalid status transition");
        }

        Complaint complaint = escalation.getComplaint();
        complaint.setStatus(ComplaintStatus.REJECTED);
        complaintRepository.save(complaint);

        escalation.setHandledBy(districtActor);
        escalation.setStatus("REJECTED");
        escalation.setReason(reason);
        Escalation savedEscalation = escalationRepository.save(escalation);

        ComplaintStatusLog log = new ComplaintStatusLog();
        log.setComplaint(complaint);
        log.setStatus(ComplaintStatus.REJECTED);
        log.setActor(districtActor);
        log.setActorRole(UserRole.DISTRICT);
        log.setRemarks(reason);
        log.setTimestamp(LocalDateTime.now());
        complaintStatusLogRepository.save(log);

        return savedEscalation;
    }

    private Escalation getEscalationOrThrow(Long escalationId) {
        return escalationRepository.findById(escalationId)
                .orElseThrow(() -> new ResourceNotFoundException("Escalation not found with id: " + escalationId));
    }

    private User getDistrictActorOrThrow(Long actorId) {
        User actor = userRepository.findById(actorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + actorId));

        if (actor.getRole() != UserRole.DISTRICT) {
            throw new UnauthorizedException("Unauthorized access");
        }

        return actor;
    }
}
