PHASE 1: FOUNDATION (BASE BACKEND)
Goal: Project run ho, DB tables create ho, basic APIs chal jaaye

Build:

All Entities (LLD.md ke according)
All Enums
All Repositories
Basic Service layer (minimal logic)
Basic CRUD APIs

Do NOT include:

JWT
Security
OTP
Escalation

Output:

Tables auto-create ho
APIs Postman me chal rahe ho
Data insert ho raha ho

PHASE 2: CLEAN ARCHITECTURE + DTO
Goal: Professional backend structure

Build:

DTO classes (request/response)
Mapper layer (Entity ↔ DTO)
Validation annotations (@NotNull, etc.)
Clean service logic

Output:

Clean API contracts
Validation working
Direct entity exposure band

PHASE 3: AUTH SYSTEM (CORE)
Goal: Registration + login working

Build:

Register API
OTP generation
OTP table usage
Email sending (SMTP)
Verify OTP API
Login API
Password hashing (BCrypt)

Do NOT include:

JWT

Output:

Register → OTP → Verify flow working
Login working

PHASE 4: COMPLAINT CORE SYSTEM
Goal: Main business logic start

Build:

Create Complaint API
Get My Complaints
Get Complaint by ID
Timeline creation (SUBMITTED)

Output:

Complaint create ho raha
Timeline generate ho raha

PHASE 5: PRADHAN WORKFLOW
Goal: Complaint lifecycle complete

Build:

Accept complaint
Reject (with reason)
Inspection
Verify (deadline set)
Resolve

Important:

Status transition validation
Timeline update har step par

Output:

Full complaint lifecycle working

PHASE 6: ESCALATION SYSTEM
Goal: Auto escalation

Build:

Scheduler (Spring @Scheduled)
Deadline check
Escalation record
District assignment

Output:

Auto escalation working

PHASE 7: DISTRICT MODULE
Goal: Escalated cases handle karna

Build:

Accept escalation
Reject escalation
Deadline reset

Output:

District actions working

PHASE 8: COMMUNITY SYSTEM
Goal: Group/chat feature

Build:

Community creation
Join community
Send message
Fetch messages

Output:

Chat system working

PHASE 9: NOTIFICATIONS + CHATBOT
Goal: UX improve

Build:

Notification system
Mark as read
Basic chatbot (rule-based)

Output:

Notifications visible
Chatbot working

PHASE 10: SECURITY (FINAL)
Goal: Secure backend

Build:

JWT authentication
JWT filter
Role-based access
Secure APIs

Output:

Token-based login
Protected endpoints

PHASE 11: FRONTEND (PREMIUM UI)
Goal: Complete product UI

Build:

Home page
Auth pages
Dashboards
Timeline UI
Community UI

PHASE 12: FINAL POLISH + DEPLOYMENT
Goal: Production-ready system

Build:

Error handling
Logging
Performance optimization
Deployment (backend + frontend + DB)

FINAL RULES:

Har phase ke baad project run karo
Har phase ke baad APIs test karo
Errors fix karo before next phase
Kabhi bhi full project ek saath build mat karna
