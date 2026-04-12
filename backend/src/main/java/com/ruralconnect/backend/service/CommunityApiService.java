package com.ruralconnect.backend.service;

import com.ruralconnect.backend.common.exception.BadRequestException;
import com.ruralconnect.backend.common.exception.ResourceNotFoundException;
import com.ruralconnect.backend.entity.Community;
import com.ruralconnect.backend.entity.CommunityMember;
import com.ruralconnect.backend.entity.Message;
import com.ruralconnect.backend.entity.User;
import com.ruralconnect.backend.repository.CommunityMemberRepository;
import com.ruralconnect.backend.repository.CommunityRepository;
import com.ruralconnect.backend.repository.MessageRepository;
import com.ruralconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommunityApiService {

    private final CommunityRepository communityRepository;
    private final CommunityMemberRepository communityMemberRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public CommunityApiService(CommunityRepository communityRepository,
                               CommunityMemberRepository communityMemberRepository,
                               MessageRepository messageRepository,
                               UserRepository userRepository) {
        this.communityRepository = communityRepository;
        this.communityMemberRepository = communityMemberRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<Community> getCommunities() {
        return communityRepository.findAll();
    }

    @Transactional
    public Community createCommunity(Community community) {
        return communityRepository.save(community);
    }

    @Transactional
    public CommunityMember joinCommunity(Long userId, Long communityId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Community not found with id: " + communityId));

        if (communityMemberRepository.existsByUserIdAndCommunityId(userId, communityId)) {
            throw new BadRequestException("User already joined this community");
        }

        CommunityMember member = new CommunityMember();
        member.setUser(user);
        member.setCommunity(community);
        member.setRole(role == null || role.isBlank() ? "MEMBER" : role);
        return communityMemberRepository.save(member);
    }

    @Transactional
    public Message sendMessage(Long userId, Long communityId, String messageText, String mediaUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Community not found with id: " + communityId));

        if (!communityMemberRepository.existsByUserIdAndCommunityId(userId, communityId)) {
            throw new BadRequestException("User is not a member of this community");
        }

        Message message = new Message();
        message.setUser(user);
        message.setCommunity(community);
        message.setMessage(messageText);
        message.setMediaUrl(mediaUrl);
        return messageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessages(Long communityId) {
        if (!communityRepository.existsById(communityId)) {
            throw new ResourceNotFoundException("Community not found with id: " + communityId);
        }
        return messageRepository.findByCommunityIdOrderByCreatedAtAsc(communityId);
    }
}
