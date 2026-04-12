package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.Reaction;
import com.ruralconnect.backend.repository.ReactionRepository;
import org.springframework.stereotype.Service;

@Service
public class ReactionService extends AbstractCrudService<Reaction> {
    public ReactionService(ReactionRepository repository) {
        super(repository);
    }
}
