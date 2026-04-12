package com.ruralconnect.backend.service;

import com.ruralconnect.backend.common.exception.ResourceNotFoundException;
import com.ruralconnect.backend.common.exception.UnauthorizedException;
import com.ruralconnect.backend.entity.Notification;
import com.ruralconnect.backend.repository.NotificationRepository;
import com.ruralconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService extends AbstractCrudService<Notification> {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository repository, UserRepository userRepository) {
        super(repository);
        this.notificationRepository = repository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<Notification> getNotifications(Long userId, Boolean unreadOnly) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        if (Boolean.TRUE.equals(unreadOnly)) {
            return notificationRepository.findByUserIdAndIsReadOrderByCreatedAtDesc(userId, false);
        }

        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional
    public Notification markAsRead(Long id, Long userId) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));

        if (notification.getUser() == null || !notification.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("Unauthorized access");
        }

        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }
}
