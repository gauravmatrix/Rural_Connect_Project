# Rural Connect

Production-ready grievance platform with Spring Boot backend and React + Tailwind frontend.

## Project Structure

- `backend`: Spring Boot APIs (auth, complaints, escalation, community, notifications, chatbot)
- `frontend`: React app (role-based dashboards, auth + OTP, timeline, community chat)
- `docs_md`: PRD/HLD/LLD and roadmap docs
- `scripts`: local run and deployment helper scripts

## Environment Setup

### Backend

Copy `backend/.env.example` values to your system environment (or .env loader workflow) before production deployment.

Required env vars:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_MOCK_ENABLED`
- `JWT_SECRET_BASE64`
- `JWT_EXPIRATION_MS`
- `APP_PORT`

### Frontend

- Development: `frontend/.env.development`
- Production: `frontend/.env.production`
- Template: `frontend/.env.example`

## Run Locally

### Option 1: Manual

1. Backend:
   - `cd backend`
   - `./mvnw.cmd spring-boot:run`
2. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev:host`
3. Open:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080`

### Option 2: Script

- `powershell -ExecutionPolicy Bypass -File ./scripts/run-local.ps1`

## Build and Deploy

### Frontend

- `powershell -ExecutionPolicy Bypass -File ./scripts/deploy-frontend.ps1`
- Artifact: `frontend/dist`

### Backend

- `powershell -ExecutionPolicy Bypass -File ./scripts/deploy-backend.ps1`
- Artifact: `backend/target/*.jar`

## Quality Gates

### Frontend

- Lint: `cd frontend && npm run lint`
- Build: `cd frontend && npm run build`
- Full check: `cd frontend && npm run check`

### Backend

- Compile: `cd backend && ./mvnw.cmd -q -DskipTests compile`
- Tests: `cd backend && ./mvnw.cmd -q test`

## End-to-End Test Checklist

See `docs_md/FINAL_E2E_CHECKLIST.MD` for full validation sequence.
