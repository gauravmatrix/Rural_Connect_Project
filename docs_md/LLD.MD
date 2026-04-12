# Low Level Design (LLD)
Rural Connect – Centralized Rural Grievance Resolution System

STRICT IMPLEMENTATION INSTRUCTIONS:
- Follow schema exactly
- Do not rename tables/fields
- Use proper relationships and constraints
- Add indexing as specified
- Ensure compatibility with backend logic

---

## 1. DATABASE: MySQL

---

## 2. ENUMS (MANDATORY)

### UserRole
- CITIZEN
- PRADHAN
- DISTRICT

### ComplaintStatus
- SUBMITTED
- ACCEPTED
- INSPECTION
- VERIFIED
- RESOLVED
- REJECTED
- ESCALATED

---

## 3. USERS TABLE (UPDATED)

Table: users

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- full_name (VARCHAR, NOT NULL)
- age (INT, NOT NULL)
- email (VARCHAR, UNIQUE, NOT NULL)
- phone (VARCHAR, UNIQUE, NOT NULL)
- address (TEXT, NOT NULL)
- pincode (VARCHAR(6), NOT NULL)
- password (VARCHAR, NOT NULL)
- role (ENUM: UserRole, NOT NULL)

-- Role-specific fields:
- village_name (VARCHAR, NULL)
- district_name (VARCHAR, NULL)
- office_id (VARCHAR, NULL)

- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Indexes:
- email
- phone
- role

---

## 4. COMPLAINTS TABLE

Table: complaints

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- user_id (BIGINT, FK → users.id)
- category (VARCHAR)
- description (TEXT)
- media_url (VARCHAR)
- status (ENUM: ComplaintStatus)
- current_handler (ENUM: UserRole)
- deadline (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Indexes:
- user_id
- status
- current_handler

---

## 5. COMPLAINT_STATUS_LOG TABLE (CRITICAL)

Table: complaint_status_log

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- complaint_id (BIGINT, FK → complaints.id)
- status (ENUM: ComplaintStatus)
- actor_id (BIGINT, FK → users.id)
- actor_role (ENUM: UserRole)
- remarks (TEXT)
- timestamp (TIMESTAMP)

Indexes:
- complaint_id
- actor_id

---

## 6. ESCALATIONS TABLE

Table: escalations

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- complaint_id (BIGINT, FK → complaints.id)
- escalated_at (TIMESTAMP)
- reason (TEXT)
- handled_by (BIGINT, FK → users.id)  -- District Officer
- status (VARCHAR)

Indexes:
- complaint_id

---

## 7. COMMUNITY TABLE

Table: community

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- village_name (VARCHAR)
- created_at (TIMESTAMP)

---

## 8. COMMUNITY MEMBERS

Table: community_members

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- user_id (BIGINT, FK → users.id)
- community_id (BIGINT, FK → community.id)
- role (VARCHAR)

Indexes:
- user_id
- community_id

---

## 9. MESSAGES TABLE

Table: messages

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- community_id (BIGINT, FK → community.id)
- user_id (BIGINT, FK → users.id)
- message (TEXT)
- media_url (VARCHAR)
- created_at (TIMESTAMP)

Indexes:
- community_id
- user_id

---

## 10. REACTIONS TABLE

Table: reactions

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- message_id (BIGINT, FK → messages.id)
- user_id (BIGINT, FK → users.id)
- type (VARCHAR)

---

## 11. NOTIFICATIONS TABLE

Table: notifications

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- user_id (BIGINT, FK → users.id)
- message (TEXT)
- is_read (BOOLEAN DEFAULT FALSE)
- created_at (TIMESTAMP)

Indexes:
- user_id

---

## 12. OTP VERIFICATION TABLE

Table: otp_verification

Fields:
- id (BIGINT, PK, AUTO_INCREMENT)
- email (VARCHAR)
- otp (VARCHAR)
- expires_at (TIMESTAMP)

Indexes:
- email

---

## 13. RELATIONSHIPS

- users → complaints (1:M)
- complaints → complaint_status_log (1:M)
- complaints → escalations (1:M)
- users → notifications (1:M)
- community → messages (1:M)
- users → messages (1:M)

---

## 14. DATA INTEGRITY RULES

- Every complaint must have initial status: SUBMITTED
- Reject must include remarks
- Escalation must create a timeline entry
- Role-specific fields must be validated:
  - PRADHAN → village_name required
  - DISTRICT → district_name required
- Foreign keys must not be null

---

## 15. INDEXING STRATEGY

- complaints(status)
- complaints(current_handler)
- complaint_status_log(complaint_id)
- notifications(user_id)
- users(email, phone)

---

## 16. QUERY OPTIMIZATION RULES

- Use JOIN instead of multiple queries
- Use pagination (LIMIT, OFFSET)
- Avoid SELECT *
- Fetch timeline using indexed complaint_id

---

## 17. SAMPLE STATUS FLOW

SUBMITTED → ACCEPTED → INSPECTION → VERIFIED → RESOLVED  

OR  

SUBMITTED → REJECTED  

OR  

ANY → ESCALATED → DISTRICT ACTION  

---

## 18. OUTPUT REQUIREMENT

Database must:
- Be normalized
- Support high performance queries
- Maintain referential integrity
- Be scalable and production-ready