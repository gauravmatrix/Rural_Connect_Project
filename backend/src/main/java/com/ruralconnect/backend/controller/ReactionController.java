package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.ReactionRequest;
import com.ruralconnect.backend.dto.response.ReactionResponse;
import com.ruralconnect.backend.entity.Reaction;
import com.ruralconnect.backend.mapper.ReactionMapper;
import com.ruralconnect.backend.service.ReactionService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reactions")
@PreAuthorize("hasRole('DISTRICT')")
public class ReactionController {

    private final ReactionService service;
    private final ReactionMapper mapper;

    public ReactionController(ReactionService service, ReactionMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<ReactionResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ReactionResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public ReactionResponse create(@Valid @RequestBody ReactionRequest request) {
        Reaction reaction = mapper.toEntity(request);
        return mapper.toResponse(service.create(reaction));
    }

    @PutMapping("/{id}")
    public ReactionResponse update(@PathVariable Long id, @Valid @RequestBody ReactionRequest request) {
        Reaction reaction = mapper.toEntity(request);
        reaction.setId(id);
        return mapper.toResponse(service.update(id, reaction));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
