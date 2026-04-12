package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.MessageRequest;
import com.ruralconnect.backend.dto.response.MessageResponse;
import com.ruralconnect.backend.entity.Message;
import com.ruralconnect.backend.mapper.MessageMapper;
import com.ruralconnect.backend.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
@PreAuthorize("hasRole('DISTRICT')")
public class MessageController {

    private final MessageService service;
    private final MessageMapper mapper;

    public MessageController(MessageService service, MessageMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<MessageResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public MessageResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public MessageResponse create(@Valid @RequestBody MessageRequest request) {
        Message message = mapper.toEntity(request);
        return mapper.toResponse(service.create(message));
    }

    @PutMapping("/{id}")
    public MessageResponse update(@PathVariable Long id, @Valid @RequestBody MessageRequest request) {
        Message message = mapper.toEntity(request);
        message.setId(id);
        return mapper.toResponse(service.update(id, message));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
