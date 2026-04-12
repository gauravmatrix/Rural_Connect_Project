
# Rural Connect

A production-grade, scalable grievance redressal platform featuring a secure Spring Boot backend and a modern React + Tailwind CSS frontend.

---

## 🗂 Project Structure

```
Rural_Connect_Project/
├── backend/      # Spring Boot REST APIs (auth, complaints, escalation, notifications, chatbot)
├── frontend/     # React app (role-based dashboards, authentication, timeline, community chat)
├── docs_md/      # Product, design, and roadmap documentation (PRD, HLD, LLD, etc.)
├── scripts/      # Local run and deployment helper scripts
```

---

## ⚙️ Environment Setup

### Backend

1. Copy `backend/.env.example` to your environment or use a .env loader.
2. Set the following required variables:

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

---

## 🚀 Local Development

### Option 1: Manual

```sh
# Start Backend
cd backend
./mvnw.cmd spring-boot:run

# Start Frontend (in a new terminal)
cd frontend
npm install
npm run dev:host

# Access:
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
```

### Option 2: Scripted

```sh
powershell -ExecutionPolicy Bypass -File ./scripts/run-local.ps1
```

---

## 🏗 Build & Deploy

### Frontend

```sh
powershell -ExecutionPolicy Bypass -File ./scripts/deploy-frontend.ps1
# Output: frontend/dist
```

### Backend

```sh
powershell -ExecutionPolicy Bypass -File ./scripts/deploy-backend.ps1
# Output: backend/target/*.jar
```

---

## ✅ Quality Gates

### Frontend

- Lint: `cd frontend && npm run lint`
- Build: `cd frontend && npm run build`
- Full Check: `cd frontend && npm run check`

### Backend

- Compile: `cd backend && ./mvnw.cmd -q -DskipTests compile`
- Tests:   `cd backend && ./mvnw.cmd -q test`

---

## 🧪 End-to-End Checklist

See [`docs_md/FINAL_E2E_CHECKLIST.MD`](docs_md/FINAL_E2E_CHECKLIST.MD) for the full validation sequence.

---

## 📄 Documentation

- Product, design, and technical docs: [`docs_md/`](docs_md/)
- API and architecture: See HLD/LLD in `docs_md/`

---

## 🛡 Security & Best Practices

- Sensitive files and build outputs are git-ignored by default (`.gitignore` in backend & frontend).
- Never commit `.env`, credentials, or secrets.
- Review and follow the [Quality Gates](#quality-gates) before merging or deploying.

---

## 🤝 Contributing

1. Fork the repo and create your branch from `main`.
2. Ensure all tests and quality checks pass.
3. Submit a pull request with a clear description.

---

## 📬 Contact

For issues, suggestions, or contributions, open an issue or contact the maintainer.

---
