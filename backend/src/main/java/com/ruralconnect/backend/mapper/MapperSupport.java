package com.ruralconnect.backend.mapper;

import com.ruralconnect.backend.entity.Community;
import com.ruralconnect.backend.entity.Complaint;
import com.ruralconnect.backend.entity.Message;
import com.ruralconnect.backend.entity.User;

public final class MapperSupport {

    private MapperSupport() {
    }

    public static User userRef(Long id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    public static Complaint complaintRef(Long id) {
        Complaint complaint = new Complaint();
        complaint.setId(id);
        return complaint;
    }

    public static Community communityRef(Long id) {
        Community community = new Community();
        community.setId(id);
        return community;
    }

    public static Message messageRef(Long id) {
        Message message = new Message();
        message.setId(id);
        return message;
    }
}
