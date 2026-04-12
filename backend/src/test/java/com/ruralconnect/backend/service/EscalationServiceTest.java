package com.ruralconnect.backend.service;

import com.ruralconnect.backend.entity.Complaint;
import com.ruralconnect.backend.entity.ComplaintStatusLog;
import com.ruralconnect.backend.entity.Escalation;
import com.ruralconnect.backend.entity.User;
import com.ruralconnect.backend.enums.ComplaintStatus;
import com.ruralconnect.backend.enums.UserRole;
import com.ruralconnect.backend.repository.ComplaintRepository;
import com.ruralconnect.backend.repository.ComplaintStatusLogRepository;
import com.ruralconnect.backend.repository.EscalationRepository;
import com.ruralconnect.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EscalationServiceTest {

    @Mock
    private EscalationRepository escalationRepository;

    @Mock
    private ComplaintRepository complaintRepository;

    @Mock
    private ComplaintStatusLogRepository complaintStatusLogRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private EscalationService escalationService;

    @Captor
    private ArgumentCaptor<Complaint> complaintCaptor;

    @Captor
    private ArgumentCaptor<Escalation> escalationCaptor;

    @Captor
    private ArgumentCaptor<ComplaintStatusLog> timelineCaptor;

    @Test
    void autoEscalateOverdueComplaints_shouldEscalateAndCreateTimeline() {
        User citizen = new User();
        citizen.setId(10L);
        citizen.setRole(UserRole.CITIZEN);

        Complaint overdueComplaint = new Complaint();
        overdueComplaint.setId(100L);
        overdueComplaint.setUser(citizen);
        overdueComplaint.setStatus(ComplaintStatus.VERIFIED);
        overdueComplaint.setCurrentHandler(UserRole.PRADHAN);
        overdueComplaint.setDeadline(LocalDateTime.now().minusMinutes(15));

        User district = new User();
        district.setId(20L);
        district.setRole(UserRole.DISTRICT);

        when(complaintRepository.findByDeadlineBeforeAndStatusNotIn(any(), any()))
                .thenReturn(List.of(overdueComplaint));
        when(userRepository.findFirstByRole(UserRole.DISTRICT)).thenReturn(Optional.of(district));

        escalationService.autoEscalateOverdueComplaints();

        verify(complaintRepository).save(complaintCaptor.capture());
        verify(escalationRepository).save(escalationCaptor.capture());
        verify(complaintStatusLogRepository).save(timelineCaptor.capture());

        Complaint savedComplaint = complaintCaptor.getValue();
        assertThat(savedComplaint.getStatus()).isEqualTo(ComplaintStatus.ESCALATED);
        assertThat(savedComplaint.getCurrentHandler()).isEqualTo(UserRole.DISTRICT);

        Escalation escalation = escalationCaptor.getValue();
        assertThat(escalation.getComplaint().getId()).isEqualTo(100L);
        assertThat(escalation.getHandledBy().getId()).isEqualTo(20L);
        assertThat(escalation.getStatus()).isEqualTo("ESCALATED");

        ComplaintStatusLog timeline = timelineCaptor.getValue();
        assertThat(timeline.getComplaint().getId()).isEqualTo(100L);
        assertThat(timeline.getStatus()).isEqualTo(ComplaintStatus.ESCALATED);
        assertThat(timeline.getRemarks()).isEqualTo("Auto-escalated due to deadline breach");
    }
}
