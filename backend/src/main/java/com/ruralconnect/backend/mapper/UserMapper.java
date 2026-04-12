package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.dto.request.UserRequest;
import com.ruralconnect.backend.dto.response.UserResponse;
import com.ruralconnect.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements EntityMapper<User, UserRequest, UserResponse> {

    @Override
    public User toEntity(UserRequest request) {
        User entity = new User();
        entity.setFullName(request.getFullName());
        entity.setAge(request.getAge());
        entity.setEmail(request.getEmail());
        entity.setPhone(request.getPhone());
        entity.setAddress(request.getAddress());
        entity.setPincode(request.getPincode());
        entity.setPassword(request.getPassword());
        entity.setRole(request.getRole());
        entity.setVillageName(request.getVillageName());
        entity.setDistrictName(request.getDistrictName());
        entity.setOfficeId(request.getOfficeId());
        return entity;
    }

    @Override
    public UserResponse toResponse(User entity) {
        UserResponse response = new UserResponse();
        response.setId(entity.getId());
        response.setFullName(entity.getFullName());
        response.setAge(entity.getAge());
        response.setEmail(entity.getEmail());
        response.setPhone(entity.getPhone());
        response.setAddress(entity.getAddress());
        response.setPincode(entity.getPincode());
        response.setRole(entity.getRole());
        response.setVillageName(entity.getVillageName());
        response.setDistrictName(entity.getDistrictName());
        response.setOfficeId(entity.getOfficeId());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }
}
