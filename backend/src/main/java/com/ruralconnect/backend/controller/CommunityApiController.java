package com.ruralconnect.backend.controller;

import com.ruralconnect.backend.dto.request.CommunityMessageRequest;
import com.ruralconnect.backend.dto.request.CommunityRequest;
import com.ruralconnect.backend.dto.request.JoinCommunityRequest;
import com.ruralconnect.backend.dto.response.CommunityMemberResponse;
import com.ruralconnect.backend.dto.response.CommunityResponse;
import com.ruralconnect.backend.dto.response.MessageResponse;
import com.ruralconnect.backend.entity.Community;
import com.ruralconnect.backend.entity.CommunityMember;
import com.ruralconnect.backend.entity.Message;
import com.ruralconnect.backend.mapper.CommunityMapper;
import com.ruralconnect.backend.mapper.CommunityMemberMapper;
import com.ruralconnect.backend.mapper.MessageMapper;
import com.ruralconnect.backend.security.UserPrincipal;
import com.ruralconnect.backend.service.CommunityApiService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/community")
public class CommunityApiController {

    private final CommunityApiService communityApiService;
    private final CommunityMapper communityMapper;
    private final CommunityMemberMapper communityMemberMapper;
    private final MessageMapper messageMapper;

    public CommunityApiController(CommunityApiService communityApiService,
                                  CommunityMapper communityMapper,
                                  CommunityMemberMapper communityMemberMapper,
                                  MessageMapper messageMapper) {
        this.communityApiService = communityApiService;
        this.communityMapper = communityMapper;
        this.communityMemberMapper = communityMemberMapper;
        this.messageMapper = messageMapper;
    }

    @GetMapping
    public List<CommunityResponse> getCommunity() {
        return communityApiService.getCommunities().stream().map(communityMapper::toResponse).toList();
    }

    @PostMapping
    public CommunityResponse createCommunity(@Valid @RequestBody CommunityRequest request) {
        Community community = communityMapper.toEntity(request);
        return communityMapper.toResponse(communityApiService.createCommunity(community));
    }

    @PostMapping("/join")
    public CommunityMemberResponse joinCommunity(@AuthenticationPrincipal UserPrincipal principal,
                                                 @Valid @RequestBody JoinCommunityRequest request) {
        CommunityMember member = communityApiService.joinCommunity(principal.getId(), request.getCommunityId(), request.getRole());
        return communityMemberMapper.toResponse(member);
    }

    @PostMapping("/message")
    public MessageResponse sendMessage(@AuthenticationPrincipal UserPrincipal principal,
                                       @Valid @RequestBody CommunityMessageRequest request) {
        Message message = communityApiService.sendMessage(
                principal.getId(),
                request.getCommunityId(),
                request.getMessage(),
                request.getMediaUrl()
        );
        return messageMapper.toResponse(message);
    }

    @GetMapping("/messages")
    public List<MessageResponse> getMessages(@RequestParam Long communityId) {
        return communityApiService.getMessages(communityId).stream().map(messageMapper::toResponse).toList();
    }
}
