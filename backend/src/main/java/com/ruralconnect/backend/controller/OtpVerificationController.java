package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.OtpVerificationRequest;
import com.ruralconnect.backend.dto.response.OtpVerificationResponse;
import com.ruralconnect.backend.entity.OtpVerification;
import com.ruralconnect.backend.mapper.OtpVerificationMapper;
import com.ruralconnect.backend.service.OtpVerificationService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/otp-verifications")
@PreAuthorize("hasRole('DISTRICT')")
public class OtpVerificationController {

    private final OtpVerificationService service;
    private final OtpVerificationMapper mapper;

    public OtpVerificationController(OtpVerificationService service, OtpVerificationMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<OtpVerificationResponse> findAll() {
        return service.findAll().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public OtpVerificationResponse findById(@PathVariable Long id) {
        return mapper.toResponse(service.findById(id));
    }

    @PostMapping
    public OtpVerificationResponse create(@Valid @RequestBody OtpVerificationRequest request) {
        OtpVerification otpVerification = mapper.toEntity(request);
        return mapper.toResponse(service.create(otpVerification));
    }

    @PutMapping("/{id}")
    public OtpVerificationResponse update(@PathVariable Long id, @Valid @RequestBody OtpVerificationRequest request) {
        OtpVerification otpVerification = mapper.toEntity(request);
        otpVerification.setId(id);
        return mapper.toResponse(service.update(id, otpVerification));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
