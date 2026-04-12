package com.ruralconnect.backend.auth.service;

import com.ruralconnect.backend.auth.model.PendingRegistration;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
public class PendingRegistrationStore {

    private final ConcurrentMap<String, PendingRegistration> store = new ConcurrentHashMap<>();

    public void put(String email, PendingRegistration data) {
        store.put(email.toLowerCase(), data);
    }

    public Optional<PendingRegistration> get(String email) {
        return Optional.ofNullable(store.get(email.toLowerCase()));
    }

    public void remove(String email) {
        store.remove(email.toLowerCase());
    }
}
