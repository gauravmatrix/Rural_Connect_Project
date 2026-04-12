package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.CommunityRequest;
import com.ruralconnect.backend.dto.response.CommunityResponse;
import com.ruralconnect.backend.entity.Community;
import com.ruralconnect.backend.mapper.CommunityMapper;
import com.ruralconnect.backend.service.CommunityService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/communities")
@PreAuthorize("hasRole('DISTRICT')")
public class CommunityController {

    private final CommunityService service;
    private final CommunityMapper mapper;

    public CommunityController(CommunityService service, CommunityMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<CommunityResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public CommunityResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public CommunityResponse create(@Valid @RequestBody CommunityRequest request) {
        Community community = mapper.toEntity(request);
        return mapper.toResponse(service.create(community));
    }

    @PutMapping("/{id}")
    public CommunityResponse update(@PathVariable Long id, @Valid @RequestBody CommunityRequest request) {
        Community community = mapper.toEntity(request);
        community.setId(id);
        return mapper.toResponse(service.update(id, community));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
