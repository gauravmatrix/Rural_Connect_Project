# High Level Design (HLD)
Rural Connect – Centralized Rural Grievance Resolution System

STRICT IMPLEMENTATION INSTRUCTIONS:
- Follow layered architecture strictly
- Do not mix controller, service, and repository logic
- Ensure modular and scalable code
- Use proper naming conventions

---

## 1. SYSTEM ARCHITECTURE

Use a standard 3-tier architecture:

Frontend (Client Layer)
↓
Backend (Spring Boot Application)
↓
Database (MySQL)

---

## 2. ARCHITECTURE LAYERS

### 2.1 Controller Layer
- Handles HTTP requests
- Maps endpoints
- Validates input (basic validation)
- Calls service layer

### 2.2 Service Layer
- Contains business logic
- Handles workflows (complaint lifecycle, escalation)
- Calls repository layer

### 2.3 Repository Layer
- Handles database operations
- Use JPA/Hibernate
- No business logic here

---

## 3. BACKEND MODULES

Create separate modules/packages:

1. auth
2. user
3. complaint
4. timeline
5. escalation
6. community
7. notification
8. chatbot

Each module must have:
- Controller
- Service
- Repository
- Entity

---

## 4. DATA FLOW (COMPLAINT)

1. User submits complaint (Frontend)
2. Request → ComplaintController
3. Controller → ComplaintService
4. Service → Save complaint in DB
5. Service → Create timeline entry
6. Response → Frontend

---

## 5. COMPLAINT WORKFLOW ENGINE

Implement a workflow system:

Each complaint has:
- current_status
- current_handler (PRADHAN / DISTRICT)

Status transitions must be controlled in service layer.

DO NOT allow invalid transitions.

---

## 6. ESCALATION ENGINE

Use Spring Scheduler:

- Run job every X minutes
- Check complaints:
  IF current_time > deadline AND status != resolved
  → Mark as escalated
  → Assign to District Officer
  → Add timeline entry

---

## 7. AUTHENTICATION FLOW

1. Register → OTP verification
2. Login → generate JWT
3. Every API must validate JWT
4. Extract role from token

---

## 8. ROLE-BASED ACCESS CONTROL

Use Spring Security:

- Citizen → limited endpoints
- Pradhan → complaint management
- District → escalation + analytics

---

## 9. DATABASE DESIGN APPROACH

- Use normalized tables
- Use indexing on:
  - complaint_id
  - user_id
  - status
- Use foreign keys properly

---

## 10. FILE HANDLING

- Store uploaded files in:
  /uploads directory (local)
- Save file path in DB

---

## 11. NOTIFICATION SYSTEM

- Store notifications in DB
- Fetch via API
- Trigger on:
  - Status change
  - Escalation
  - Rejection

---

## 12. COMMUNITY SYSTEM FLOW

1. User joins community
2. User sends message
3. Message saved in DB
4. Other users fetch messages

---

## 13. CHATBOT ARCHITECTURE

- Simple rule-based system
- API endpoint:
  /chatbot/query
- Return predefined responses

---

## 14. FRONTEND ARCHITECTURE

Use modular JS structure:

- pages/
- components/
- services/ (API calls)
- utils/

---

## 15. API COMMUNICATION

- Use REST APIs
- JSON request/response
- Proper status codes:
  200 → success
  400 → bad request
  401 → unauthorized
  500 → server error

---

## 16. ERROR HANDLING

- Global exception handler
- Return structured error response:
{
  "message": "Error message",
  "status": 400
}

---

## 17. SECURITY

- Validate all inputs
- Use JWT
- Do not expose internal data
- Hash passwords (BCrypt)

---

## 18. PERFORMANCE

- Use pagination for lists
- Optimize queries
- Avoid N+1 queries

---

## 19. LOGGING

- Log important actions:
  - Login
  - Complaint updates
  - Escalation

---

## 20. OUTPUT REQUIREMENT

The system must:
- Follow layered architecture
- Have modular code
- Be fully functional end-to-end