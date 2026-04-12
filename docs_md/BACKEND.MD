# Backend Logic & API Design
Rural Connect – Centralized Rural Grievance Resolution System

STRICT IMPLEMENTATION INSTRUCTIONS:
- Follow API structure exactly
- Implement proper validation and error handling
- Maintain clean separation of controller, service, repository
- Use DTOs for request/response
- Ensure all APIs are production-ready

---

## 1. BASE CONFIG

Base URL: /api/v1

All APIs must:
- Use JSON
- Require JWT (except auth APIs)
- Return proper HTTP status codes

---

## 2. AUTH MODULE

### 2.1 Register User

POST /auth/register

Request:
{
  "full_name": "string",
  "age": 25,
  "email": "string",
  "phone": "string",
  "address": "string",
  "pincode": "132001",
  "password": "string",
  "role": "CITIZEN | PRADHAN | DISTRICT",
  "village_name": "optional",
  "district_name": "optional",
  "office_id": "optional"
}

Flow:
- Validate all fields
- Validate role-based fields:
  - If PRADHAN → village_name required
  - If DISTRICT → district_name required
- Check email/phone uniqueness
- Hash password (BCrypt)
- Generate OTP
- Save OTP in otp_verification table
- Send OTP via email
- Return success message

Response:
{
  "message": "OTP sent successfully"
}

---

### 2.2 Verify OTP

POST /auth/verify-otp

Request:
{
  "email": "string",
  "otp": "123456"
}

Flow:
- Match OTP
- Check expiry
- Create user in DB
- Delete OTP record

Response:
{
  "message": "Account created successfully"
}

---

### 2.3 Login

POST /auth/login

Request:
{
  "email": "string",
  "password": "string"
}

Flow:
- Validate credentials
- Compare hashed password
- Generate JWT token

Response:
{
  "token": "JWT_TOKEN",
  "role": "CITIZEN",
  "user_id": 1
}

---

## 3. COMPLAINT MODULE

### 3.1 Create Complaint

POST /complaints

Request:
{
  "category": "Water",
  "description": "No water supply",
  "media_url": "optional"
}

Flow:
- Get user from JWT
- Save complaint:
  - status = SUBMITTED
  - current_handler = PRADHAN
- Create timeline entry

Response:
{
  "message": "Complaint submitted successfully"
}

---

### 3.2 Get My Complaints

GET /complaints/my

Response:
[
  {
    "id": 1,
    "category": "Water",
    "status": "SUBMITTED"
  }
]

---

### 3.3 Get Complaint Details

GET /complaints/{id}

Response:
{
  "complaint": {...},
  "timeline": [...]
}

---

## 4. PRADHAN ACTION MODULE

### 4.1 Accept Complaint

PUT /complaints/{id}/accept

Flow:
- Validate role = PRADHAN
- Validate current status = SUBMITTED
- Update status → ACCEPTED
- Add timeline entry

---

### 4.2 Reject Complaint

PUT /complaints/{id}/reject

Request:
{
  "reason": "Invalid issue"
}

Flow:
- Validate reason (required)
- Update status → REJECTED
- Add timeline entry
- Notify District Officer

---

### 4.3 Start Inspection

PUT /complaints/{id}/inspection

Flow:
- Validate status = ACCEPTED
- Update status → INSPECTION
- Add timeline entry

---

### 4.4 Verify Complaint

PUT /complaints/{id}/verify

Flow:
- Validate status = INSPECTION
- Update status → VERIFIED
- Set deadline (3–7 days)
- Add timeline entry

---

### 4.5 Resolve Complaint

PUT /complaints/{id}/resolve

Flow:
- Validate status = VERIFIED
- Update status → RESOLVED
- Add timeline entry

---

## 5. ESCALATION MODULE

### 5.1 Auto Escalation (Scheduler)

Logic:
IF current_time > deadline AND status != RESOLVED
→ status = ESCALATED
→ current_handler = DISTRICT
→ Create escalation record
→ Add timeline entry
→ Notify District Officer

---

### 5.2 District Accept

PUT /escalations/{id}/accept

Request:
{
  "deadline": "timestamp"
}

Flow:
- Validate role = DISTRICT
- Update complaint handler → DISTRICT
- Set new deadline
- Add timeline entry

---

### 5.3 District Reject

PUT /escalations/{id}/reject

Request:
{
  "reason": "Invalid escalation"
}

Flow:
- Validate reason
- Update status → REJECTED
- Add timeline entry

---

## 6. TIMELINE MODULE

### 6.1 Get Timeline

GET /timeline/{complaint_id}

Response:
[
  {
    "status": "ACCEPTED",
    "actor": "PRADHAN",
    "time": "...",
    "remarks": ""
  }
]

---

## 7. COMMUNITY MODULE

### 7.1 Get Community

GET /community

---

### 7.2 Send Message

POST /community/message

Request:
{
  "message": "Road issue",
  "media_url": ""
}

---

### 7.3 Get Messages

GET /community/messages

---

## 8. NOTIFICATION MODULE

### 8.1 Get Notifications

GET /notifications

---

### 8.2 Mark as Read

PUT /notifications/{id}/read

---

## 9. CHATBOT MODULE

### 9.1 Query Chatbot

POST /chatbot/query

Request:
{
  "query": "How to raise complaint?"
}

Response:
{
  "reply": "Go to Raise Complaint section..."
}

---

## 10. VALIDATION RULES

- Reject must have reason
- Only valid status transitions allowed
- Role-based access must be enforced
- Email & phone must be unique
- Role-based fields must be validated

---

## 11. ERROR HANDLING

Return format:
{
  "message": "Error message",
  "status": 400
}

Common errors:
- "Invalid input data"
- "Unauthorized access"
- "Resource not found"
- "Invalid status transition"
- "OTP expired"

---

## 12. SECURITY

- Use JWT filter
- Hash passwords (BCrypt)
- Validate all inputs
- Protect all endpoints

---

## 13. OUTPUT REQUIREMENT

Backend must:
- Provide all APIs
- Handle workflows correctly
- Maintain data consistency
- Be scalable and production-ready