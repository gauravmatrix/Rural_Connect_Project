package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.User;
import com.ruralconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractCrudService<User> {
    public UserService(UserRepository repository) {
        super(repository);
    }
}
