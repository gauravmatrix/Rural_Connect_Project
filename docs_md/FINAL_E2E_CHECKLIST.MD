# Final End-to-End Checklist

## 1. Environment and Services

- [ ] MySQL running and DB accessible
- [ ] Backend env vars configured
- [ ] Frontend env files configured
- [ ] Mail credentials valid (or mock mode enabled for non-email test)

## 2. Backend Health

- [ ] `./mvnw.cmd -q -DskipTests compile` passes
- [ ] `./mvnw.cmd -q test` passes
- [ ] App starts on configured port

## 3. Auth Flow

- [ ] Register API returns OTP sent message
- [ ] OTP received in email
- [ ] Verify OTP succeeds
- [ ] Login returns JWT token

## 4. Citizen Flow

- [ ] Create complaint
- [ ] My complaints list loads
- [ ] Complaint detail timeline visible
- [ ] Community join and send message works
- [ ] Notifications load and mark-as-read works

## 5. Pradhan Flow

- [ ] Login as PRADHAN
- [ ] Accept / reject submitted complaint
- [ ] Start inspection
- [ ] Verify complaint and deadline set
- [ ] Resolve complaint

## 6. District Flow

- [ ] Auto escalation creates escalated case after deadline breach
- [ ] Accept escalation with new deadline
- [ ] Reject escalation with reason

## 7. Security Checks

- [ ] Protected endpoints reject missing token
- [ ] Role mismatch endpoints return unauthorized/forbidden
- [ ] User cannot mark other user's notifications as read

## 8. Frontend UX/Performance

- [ ] Mobile responsiveness at 360px width
- [ ] Sidebar and navigation usable on mobile
- [ ] Lazy routes load with skeletons
- [ ] Error boundary fallback renders on runtime failures
- [ ] Production build generated successfully

## 9. Deployment Readiness

- [ ] Frontend `dist` artifact generated
- [ ] Backend jar generated
- [ ] Deployment scripts run successfully
- [ ] Runbook verified by another system/user
