package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.EscalationAcceptRequest;
import com.ruralconnect.backend.dto.request.EscalationRejectRequest;
import com.ruralconnect.backend.dto.request.EscalationRequest;
import com.ruralconnect.backend.dto.response.EscalationResponse;
import com.ruralconnect.backend.entity.Escalation;
import com.ruralconnect.backend.mapper.EscalationMapper;
import com.ruralconnect.backend.security.UserPrincipal;
import com.ruralconnect.backend.service.EscalationService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/escalations")
public class EscalationController {

    private final EscalationService service;
    private final EscalationMapper mapper;

    public EscalationController(EscalationService service, EscalationMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<EscalationResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public EscalationResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public EscalationResponse create(@Valid @RequestBody EscalationRequest request) {
        Escalation escalation = mapper.toEntity(request);
        return mapper.toResponse(service.create(escalation));
    }

    @PutMapping("/{id}")
    public EscalationResponse update(@PathVariable Long id, @Valid @RequestBody EscalationRequest request) {
        Escalation escalation = mapper.toEntity(request);
        escalation.setId(id);
        return mapper.toResponse(service.update(id, escalation));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PreAuthorize("hasRole('DISTRICT')")
    @PutMapping("/{id}/accept")
    public EscalationResponse acceptEscalation(@PathVariable Long id,
                                               @AuthenticationPrincipal UserPrincipal principal,
                                               @Valid @RequestBody EscalationAcceptRequest request) {
        return mapper.toResponse(service.acceptEscalation(id, principal.getId(), request.getDeadline()));
    }

    @PreAuthorize("hasRole('DISTRICT')")
    @PutMapping("/{id}/reject")
    public EscalationResponse rejectEscalation(@PathVariable Long id,
                                               @AuthenticationPrincipal UserPrincipal principal,
                                               @Valid @RequestBody EscalationRejectRequest request) {
        return mapper.toResponse(service.rejectEscalation(id, principal.getId(), request.getReason()));
    }
}
