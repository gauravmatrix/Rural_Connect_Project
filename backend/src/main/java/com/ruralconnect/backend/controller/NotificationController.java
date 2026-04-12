package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.NotificationRequest;
import com.ruralconnect.backend.dto.response.NotificationResponse;
import com.ruralconnect.backend.entity.Notification;
import com.ruralconnect.backend.mapper.NotificationMapper;
import com.ruralconnect.backend.security.UserPrincipal;
import com.ruralconnect.backend.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService service;
    private final NotificationMapper mapper;

    public NotificationController(NotificationService service, NotificationMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<NotificationResponse> getNotifications(@AuthenticationPrincipal UserPrincipal principal,
                                                       @RequestParam(required = false, defaultValue = "false") Boolean unreadOnly) {
        return service.getNotifications(principal.getId(), unreadOnly).stream().map(mapper::toResponse).toList();
    }

    @PreAuthorize("hasRole('DISTRICT')")
    @PostMapping
    public NotificationResponse create(@Valid @RequestBody NotificationRequest request) {
        Notification notification = mapper.toEntity(request);
        return mapper.toResponse(service.create(notification));
    }

    @PutMapping("/{id}/read")
    public NotificationResponse markAsRead(@PathVariable Long id,
                                           @AuthenticationPrincipal UserPrincipal principal) {
        return mapper.toResponse(service.markAsRead(id, principal.getId()));
    }
}
