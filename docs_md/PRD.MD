# Rural Connect – Centralized Rural Grievance Resolution System

STRICT IMPLEMENTATION INSTRUCTIONS:
- Follow this document exactly
- Do not skip any feature
- Maintain modular, scalable, production-level code
- Use proper folder structure and naming conventions

---

## 1. SYSTEM OVERVIEW

Build a full-stack web application with:
- Java Spring Boot backend
- HTML/CSS/JS frontend
- MySQL database

The system must support three roles:
1. Citizen
2. Pradhan
3. District Officer

Each role must have a separate dashboard with role-based access.

---

## 2. CORE MODULES (MANDATORY)

1. Authentication Module
2. Complaint Management Module
3. Timeline Tracking Module
4. Escalation System
5. Community Module
6. Notification Module
7. Chatbot Module
8. Multi-language Support

---

## 3. USER ROLES & PERMISSIONS

### Citizen
- Register/Login
- Raise complaint
- View own complaints
- Track complaint timeline
- Access community
- Use chatbot

### Pradhan
- View incoming complaints
- Accept/Reject complaints
- Perform inspection
- Verify complaints
- Mark resolved
- View community

### District Officer
- View all complaints
- Handle escalated complaints
- Accept/Reject escalations
- Assign resolution deadlines
- View analytics

---

## 4. COMPLAINT LIFECYCLE (STRICT FLOW)

Each complaint must follow this exact flow:

Submitted → Accepted → Inspection → Verified → Resolved

Alternate flows:
- Submitted → Rejected
- Verified → Rejected
- Any stage → Escalated (if delayed)

---

## 5. ACTION RULES (STRICT)

- Reject action MUST include reason
- Accept action unlocks next step
- Only one action visible at a time (UI logic)
- All actions must be logged in database
- Timeline must update after every action

---

## 6. ESCALATION RULES

- If complaint not resolved within deadline → auto escalate
- Escalation must be handled by District Officer
- District Officer must:
  - Accept (with deadline)
  - Reject (with reason)

---

## 7. TIMELINE SYSTEM

Every complaint must have a timeline.

Each timeline entry must include:
- Status
- Actor role
- Timestamp
- Remarks

Timeline must be visible to:
- Citizen
- Pradhan
- District Officer

---

## 8. COMMUNITY MODULE

- Village-based group
- Users can:
  - Send messages
  - Upload images
  - React to messages
- Pradhan can:
  - Post announcements

---

## 9. AUTHENTICATION

- Registration with OTP verification
- Login with JWT token
- Role-based authorization

---

## 10. CHATBOT

- Floating button on all pages
- Must respond to predefined queries:
  - How to raise complaint
  - How to track complaint
  - Login help

---

## 11. MULTI-LANGUAGE

- Support Hindi and English
- Toggle on home page
- Apply globally

---

## 12. UI REQUIREMENTS

- Sidebar navigation for dashboards
- Top navbar with:
  - Notifications
  - Profile
  - Language toggle
- Clean UI similar to government portals

---

## 13. NON-FUNCTIONAL REQUIREMENTS

- Secure APIs
- Optimized DB queries
- Proper indexing
- Clean error handling
- Modular code

---

## 14. OUTPUT REQUIREMENT

The system must be fully functional with:
- Working APIs
- Connected frontend
- Proper database schema
- Clean UI
- End-to-end workflow