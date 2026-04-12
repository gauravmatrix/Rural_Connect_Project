package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.CommunityMemberRequest;
import com.ruralconnect.backend.dto.response.CommunityMemberResponse;
import com.ruralconnect.backend.entity.CommunityMember;
import com.ruralconnect.backend.mapper.CommunityMemberMapper;
import com.ruralconnect.backend.service.CommunityMemberService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/community-members")
@PreAuthorize("hasRole('DISTRICT')")
public class CommunityMemberController {

    private final CommunityMemberService service;
    private final CommunityMemberMapper mapper;

    public CommunityMemberController(CommunityMemberService service, CommunityMemberMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<CommunityMemberResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public CommunityMemberResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public CommunityMemberResponse create(@Valid @RequestBody CommunityMemberRequest request) {
        CommunityMember member = mapper.toEntity(request);
        return mapper.toResponse(service.create(member));
    }

    @PutMapping("/{id}")
    public CommunityMemberResponse update(@PathVariable Long id, @Valid @RequestBody CommunityMemberRequest request) {
        CommunityMember member = mapper.toEntity(request);
        member.setId(id);
        return mapper.toResponse(service.update(id, member));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
