package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.ComplaintStatusLogRequest;
import com.ruralconnect.backend.dto.response.ComplaintStatusLogResponse;
import com.ruralconnect.backend.entity.ComplaintStatusLog;
import com.ruralconnect.backend.mapper.ComplaintStatusLogMapper;
import com.ruralconnect.backend.service.ComplaintStatusLogService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/complaint-status-logs")
@PreAuthorize("hasRole('DISTRICT')")
public class ComplaintStatusLogController {

    private final ComplaintStatusLogService service;
    private final ComplaintStatusLogMapper mapper;

    public ComplaintStatusLogController(ComplaintStatusLogService service, ComplaintStatusLogMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<ComplaintStatusLogResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ComplaintStatusLogResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public ComplaintStatusLogResponse create(@Valid @RequestBody ComplaintStatusLogRequest request) {
        ComplaintStatusLog log = mapper.toEntity(request);
        return mapper.toResponse(service.create(log));
    }

    @PutMapping("/{id}")
    public ComplaintStatusLogResponse update(@PathVariable Long id, @Valid @RequestBody ComplaintStatusLogRequest request) {
        ComplaintStatusLog log = mapper.toEntity(request);
        log.setId(id);
        return mapper.toResponse(service.update(id, log));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
