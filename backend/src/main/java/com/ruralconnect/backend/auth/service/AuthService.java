package com.ruralconnect.backend.auth.service;

import com.ruralconnect.backend.auth.dto.request.LoginRequest;
import com.ruralconnect.backend.auth.dto.request.RegisterRequest;
import com.ruralconnect.backend.auth.dto.request.VerifyOtpRequest;
import com.ruralconnect.backend.auth.dto.response.LoginResponse;
import com.ruralconnect.backend.auth.dto.response.MessageResponse;
import com.ruralconnect.backend.auth.model.PendingRegistration;
import com.ruralconnect.backend.common.exception.BadRequestException;
import com.ruralconnect.backend.common.exception.UnauthorizedException;
import com.ruralconnect.backend.entity.OtpVerification;
import com.ruralconnect.backend.entity.User;
import com.ruralconnect.backend.enums.UserRole;
import com.ruralconnect.backend.repository.OtpVerificationRepository;
import com.ruralconnect.backend.repository.UserRepository;
import com.ruralconnect.backend.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final OtpVerificationRepository otpVerificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final OtpGenerator otpGenerator;
    private final OtpMailService otpMailService;
    private final PendingRegistrationStore pendingRegistrationStore;
    private final int otpMaxAttempts;
    private final int otpLockMinutes;

    public AuthService(UserRepository userRepository,
                       OtpVerificationRepository otpVerificationRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       OtpGenerator otpGenerator,
                       OtpMailService otpMailService,
                       PendingRegistrationStore pendingRegistrationStore,
                       @Value("${app.auth.otp.max-attempts:5}") int otpMaxAttempts,
                       @Value("${app.auth.otp.lock-minutes:15}") int otpLockMinutes) {
        this.userRepository = userRepository;
        this.otpVerificationRepository = otpVerificationRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.otpGenerator = otpGenerator;
        this.otpMailService = otpMailService;
        this.pendingRegistrationStore = pendingRegistrationStore;
        this.otpMaxAttempts = otpMaxAttempts;
        this.otpLockMinutes = otpLockMinutes;
    }

    @Transactional
    public MessageResponse register(RegisterRequest request) {
        validateRoleSpecificFields(request);

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new BadRequestException("Phone already exists");
        }

        String otp = otpGenerator.generateSixDigitOtp();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(10);

        OtpVerification otpVerification = otpVerificationRepository.findByEmail(request.getEmail())
                .orElseGet(OtpVerification::new);
        otpVerification.setEmail(request.getEmail());
        otpVerification.setOtp(otp);
        otpVerification.setExpiresAt(expiresAt);
        otpVerification.setFailedAttempts(0);
        otpVerification.setLockedUntil(null);
        otpVerificationRepository.save(otpVerification);

        pendingRegistrationStore.put(request.getEmail(), PendingRegistration.builder()
                .fullName(request.getFullName())
                .age(request.getAge())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .pincode(request.getPincode())
                .hashedPassword(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .villageName(request.getVillageName())
                .districtName(request.getDistrictName())
                .officeId(request.getOfficeId())
                .build());

        otpMailService.sendOtp(request.getEmail(), otp);
        return new MessageResponse("OTP sent successfully");
    }

    @Transactional
    public MessageResponse verifyOtp(VerifyOtpRequest request) {
        OtpVerification otpRecord = otpVerificationRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("OTP not found for email"));

        if (otpRecord.getLockedUntil() != null && otpRecord.getLockedUntil().isAfter(LocalDateTime.now())) {
            throw new BadRequestException("Too many invalid attempts. Try again later.");
        }

        if (otpRecord.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP expired");
        }

        if (!otpRecord.getOtp().equals(request.getOtp())) {
            int failedAttempts = otpRecord.getFailedAttempts() == null ? 0 : otpRecord.getFailedAttempts();
            failedAttempts++;
            otpRecord.setFailedAttempts(failedAttempts);
            if (failedAttempts >= otpMaxAttempts) {
                otpRecord.setLockedUntil(LocalDateTime.now().plusMinutes(otpLockMinutes));
            }
            otpVerificationRepository.save(otpRecord);
            throw new BadRequestException("Invalid OTP");
        }

        PendingRegistration pending = pendingRegistrationStore.get(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Registration session expired. Please register again."));

        if (userRepository.existsByEmail(pending.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        if (userRepository.existsByPhone(pending.getPhone())) {
            throw new BadRequestException("Phone already exists");
        }

        User user = new User();
        user.setFullName(pending.getFullName());
        user.setAge(pending.getAge());
        user.setEmail(pending.getEmail());
        user.setPhone(pending.getPhone());
        user.setAddress(pending.getAddress());
        user.setPincode(pending.getPincode());
        user.setPassword(pending.getHashedPassword());
        user.setRole(pending.getRole());
        user.setVillageName(pending.getVillageName());
        user.setDistrictName(pending.getDistrictName());
        user.setOfficeId(pending.getOfficeId());
        userRepository.save(user);

        otpVerificationRepository.deleteByEmail(request.getEmail());
        pendingRegistrationStore.remove(request.getEmail());

        return new MessageResponse("Account created successfully");
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole());
        return new LoginResponse(token, "Bearer", user.getId(), user.getRole());
    }

    private void validateRoleSpecificFields(RegisterRequest request) {
        if (request.getRole() == UserRole.PRADHAN && isBlank(request.getVillageName())) {
            throw new BadRequestException("Village name is required for PRADHAN");
        }

        if (request.getRole() == UserRole.DISTRICT && isBlank(request.getDistrictName())) {
            throw new BadRequestException("District name is required for DISTRICT");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
