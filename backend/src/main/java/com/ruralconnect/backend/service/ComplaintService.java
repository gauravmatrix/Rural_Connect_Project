package com.ruralconnect.backend.service;

import com.ruralconnect.backend.common.exception.BadRequestException;
import com.ruralconnect.backend.common.exception.ResourceNotFoundException;
import com.ruralconnect.backend.common.exception.UnauthorizedException;
import com.ruralconnect.backend.entity.Complaint;
import com.ruralconnect.backend.entity.ComplaintStatusLog;
import com.ruralconnect.backend.entity.User;
import com.ruralconnect.backend.enums.ComplaintStatus;
import com.ruralconnect.backend.enums.UserRole;
import com.ruralconnect.backend.repository.ComplaintRepository;
import com.ruralconnect.backend.repository.ComplaintStatusLogRepository;
import com.ruralconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService extends AbstractCrudService<Complaint> {

    private final ComplaintRepository complaintRepository;
    private final ComplaintStatusLogRepository complaintStatusLogRepository;
    private final UserRepository userRepository;

    public ComplaintService(ComplaintRepository repository,
                            ComplaintStatusLogRepository complaintStatusLogRepository,
                            UserRepository userRepository) {
        super(repository);
        this.complaintRepository = repository;
        this.complaintStatusLogRepository = complaintStatusLogRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Complaint createComplaint(Complaint complaintInput, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Complaint complaint = new Complaint();
        complaint.setUser(user);
        complaint.setCategory(complaintInput.getCategory());
        complaint.setDescription(complaintInput.getDescription());
        complaint.setMediaUrl(complaintInput.getMediaUrl());
        complaint.setStatus(ComplaintStatus.SUBMITTED);
        complaint.setCurrentHandler(UserRole.PRADHAN);

        Complaint savedComplaint = complaintRepository.save(complaint);

        ComplaintStatusLog log = new ComplaintStatusLog();
        log.setComplaint(savedComplaint);
        log.setStatus(ComplaintStatus.SUBMITTED);
        log.setActor(user);
        log.setActorRole(user.getRole());
        log.setRemarks("Complaint submitted");
        log.setTimestamp(LocalDateTime.now());
        complaintStatusLogRepository.save(log);

        return savedComplaint;
    }

    @Transactional(readOnly = true)
    public List<Complaint> findMyComplaints(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return complaintRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional(readOnly = true)
    public List<ComplaintStatusLog> getTimeline(Long complaintId) {
        if (!complaintRepository.existsById(complaintId)) {
            throw new ResourceNotFoundException("Complaint not found with id: " + complaintId);
        }
        return complaintStatusLogRepository.findByComplaintIdOrderByTimestampAsc(complaintId);
    }

    @Transactional
    public Complaint acceptComplaint(Long complaintId, Long actorId) {
        Complaint complaint = getComplaintOrThrow(complaintId);
        User actor = getPradhanActorOrThrow(actorId);
        validateCurrentHandlerPradhan(complaint);
        validateTransition(complaint.getStatus(), ComplaintStatus.SUBMITTED);

        complaint.setStatus(ComplaintStatus.ACCEPTED);
        Complaint saved = complaintRepository.save(complaint);
        addTimeline(saved, actor, ComplaintStatus.ACCEPTED, "Complaint accepted");
        return saved;
    }

    @Transactional
    public Complaint rejectComplaint(Long complaintId, Long actorId, String reason) {
        Complaint complaint = getComplaintOrThrow(complaintId);
        User actor = getPradhanActorOrThrow(actorId);
        validateCurrentHandlerPradhan(complaint);

        ComplaintStatus current = complaint.getStatus();
        if (current != ComplaintStatus.SUBMITTED && current != ComplaintStatus.VERIFIED) {
            throw new BadRequestException("Invalid status transition");
        }

        complaint.setStatus(ComplaintStatus.REJECTED);
        Complaint saved = complaintRepository.save(complaint);
        addTimeline(saved, actor, ComplaintStatus.REJECTED, reason);
        return saved;
    }

    @Transactional
    public Complaint startInspection(Long complaintId, Long actorId) {
        Complaint complaint = getComplaintOrThrow(complaintId);
        User actor = getPradhanActorOrThrow(actorId);
        validateCurrentHandlerPradhan(complaint);
        validateTransition(complaint.getStatus(), ComplaintStatus.ACCEPTED);

        complaint.setStatus(ComplaintStatus.INSPECTION);
        Complaint saved = complaintRepository.save(complaint);
        addTimeline(saved, actor, ComplaintStatus.INSPECTION, "Inspection started");
        return saved;
    }

    @Transactional
    public Complaint verifyComplaint(Long complaintId, Long actorId) {
        Complaint complaint = getComplaintOrThrow(complaintId);
        User actor = getPradhanActorOrThrow(actorId);
        validateCurrentHandlerPradhan(complaint);
        validateTransition(complaint.getStatus(), ComplaintStatus.INSPECTION);

        complaint.setStatus(ComplaintStatus.VERIFIED);
        complaint.setDeadline(LocalDateTime.now().plusDays(5));
        Complaint saved = complaintRepository.save(complaint);
        addTimeline(saved, actor, ComplaintStatus.VERIFIED, "Complaint verified");
        return saved;
    }

    @Transactional
    public Complaint resolveComplaint(Long complaintId, Long actorId) {
        Complaint complaint = getComplaintOrThrow(complaintId);
        User actor = getPradhanActorOrThrow(actorId);
        validateCurrentHandlerPradhan(complaint);
        validateTransition(complaint.getStatus(), ComplaintStatus.VERIFIED);

        complaint.setStatus(ComplaintStatus.RESOLVED);
        Complaint saved = complaintRepository.save(complaint);
        addTimeline(saved, actor, ComplaintStatus.RESOLVED, "Complaint resolved");
        return saved;
    }

    private Complaint getComplaintOrThrow(Long complaintId) {
        return complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with id: " + complaintId));
    }

    private User getPradhanActorOrThrow(Long actorId) {
        User actor = userRepository.findById(actorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + actorId));

        if (actor.getRole() != UserRole.PRADHAN) {
            throw new UnauthorizedException("Unauthorized access");
        }

        return actor;
    }

    private void validateTransition(ComplaintStatus actual, ComplaintStatus expected) {
        if (actual != expected) {
            throw new BadRequestException("Invalid status transition");
        }
    }

    private void validateCurrentHandlerPradhan(Complaint complaint) {
        if (complaint.getCurrentHandler() != UserRole.PRADHAN) {
            throw new BadRequestException("Invalid status transition");
        }
    }

    private void addTimeline(Complaint complaint, User actor, ComplaintStatus status, String remarks) {
        ComplaintStatusLog log = new ComplaintStatusLog();
        log.setComplaint(complaint);
        log.setStatus(status);
        log.setActor(actor);
        log.setActorRole(actor.getRole());
        log.setRemarks(remarks);
        log.setTimestamp(LocalDateTime.now());
        complaintStatusLogRepository.save(log);
    }
}
