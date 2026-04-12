package com.ruralconnect.backend.mapper;

public interface EntityMapper<E, Req, Res> {
    E toEntity(Req request);
    Res toResponse(E entity);
}
