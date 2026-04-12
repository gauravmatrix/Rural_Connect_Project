package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.ComplaintRequest;
import com.ruralconnect.backend.dto.request.RejectComplaintRequest;
import com.ruralconnect.backend.dto.response.ComplaintDetailsResponse;
import com.ruralconnect.backend.dto.response.ComplaintMyItemResponse;
import com.ruralconnect.backend.dto.response.ComplaintResponse;
import com.ruralconnect.backend.entity.Complaint;
import com.ruralconnect.backend.mapper.ComplaintStatusLogMapper;
import com.ruralconnect.backend.mapper.ComplaintMapper;
import com.ruralconnect.backend.security.UserPrincipal;
import com.ruralconnect.backend.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/complaints")
public class ComplaintController {

    private final ComplaintService service;
    private final ComplaintMapper mapper;
    private final ComplaintStatusLogMapper complaintStatusLogMapper;

    public ComplaintController(ComplaintService service,
                               ComplaintMapper mapper,
                               ComplaintStatusLogMapper complaintStatusLogMapper) {
        this.service = service;
        this.mapper = mapper;
        this.complaintStatusLogMapper = complaintStatusLogMapper;
    }

    @GetMapping("/{id}")
    public ComplaintDetailsResponse findById(@PathVariable Long id) {
        ComplaintDetailsResponse response = new ComplaintDetailsResponse();
        response.setComplaint(mapper.toResponse(service.findById(id)));
        response.setTimeline(service.getTimeline(id).stream().map(complaintStatusLogMapper::toResponse).toList());
        return response;
    }

    @GetMapping("/my")
    public List<ComplaintMyItemResponse> findMyComplaints(@AuthenticationPrincipal UserPrincipal principal) {
        return service.findMyComplaints(principal.getId()).stream().map(complaint -> {
            ComplaintMyItemResponse item = new ComplaintMyItemResponse();
            item.setId(complaint.getId());
            item.setCategory(complaint.getCategory());
            item.setStatus(complaint.getStatus());
            item.setCreatedAt(complaint.getCreatedAt());
            return item;
        }).toList();
    }

    @PostMapping
    public ComplaintResponse create(@AuthenticationPrincipal UserPrincipal principal,
                                    @Valid @RequestBody ComplaintRequest complaintRequest) {
        Complaint complaint = mapper.toEntity(complaintRequest);
        return mapper.toResponse(service.createComplaint(complaint, principal.getId()));
    }

    @PreAuthorize("hasRole('PRADHAN')")
    @PutMapping("/{id}/accept")
    public ComplaintResponse acceptComplaint(@PathVariable Long id,
                                             @AuthenticationPrincipal UserPrincipal principal) {
        return mapper.toResponse(service.acceptComplaint(id, principal.getId()));
    }

    @PreAuthorize("hasRole('PRADHAN')")
    @PutMapping("/{id}/reject")
    public ComplaintResponse rejectComplaint(@PathVariable Long id,
                                             @AuthenticationPrincipal UserPrincipal principal,
                                             @Valid @RequestBody RejectComplaintRequest request) {
        return mapper.toResponse(service.rejectComplaint(id, principal.getId(), request.getReason()));
    }

    @PreAuthorize("hasRole('PRADHAN')")
    @PutMapping("/{id}/inspection")
    public ComplaintResponse startInspection(@PathVariable Long id,
                                             @AuthenticationPrincipal UserPrincipal principal) {
        return mapper.toResponse(service.startInspection(id, principal.getId()));
    }

    @PreAuthorize("hasRole('PRADHAN')")
    @PutMapping("/{id}/verify")
    public ComplaintResponse verifyComplaint(@PathVariable Long id,
                                             @AuthenticationPrincipal UserPrincipal principal) {
        return mapper.toResponse(service.verifyComplaint(id, principal.getId()));
    }

    @PreAuthorize("hasRole('PRADHAN')")
    @PutMapping("/{id}/resolve")
    public ComplaintResponse resolveComplaint(@PathVariable Long id,
                                              @AuthenticationPrincipal UserPrincipal principal) {
        return mapper.toResponse(service.resolveComplaint(id, principal.getId()));
    }
}
