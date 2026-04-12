package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.Message;
import com.ruralconnect.backend.repository.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService extends AbstractCrudService<Message> {
    public MessageService(MessageRepository repository) {
        super(repository);
    }
}
