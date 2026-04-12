package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.UserRequest;
import com.ruralconnect.backend.dto.response.UserResponse;
import com.ruralconnect.backend.entity.User;
import com.ruralconnect.backend.mapper.UserMapper;
import com.ruralconnect.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@PreAuthorize("hasRole('DISTRICT')")
public class UserController {

    private final UserService service;
    private final UserMapper mapper;

    public UserController(UserService service, UserMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<UserResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public UserResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public UserResponse create(@Valid @RequestBody UserRequest userRequest) {
        User user = mapper.toEntity(userRequest);
        return mapper.toResponse(service.create(user));
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id, @Valid @RequestBody UserRequest userRequest) {
        User user = mapper.toEntity(userRequest);
        user.setId(id);
        return mapper.toResponse(service.update(id, user));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
