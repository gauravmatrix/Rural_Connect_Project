# Dashboard UI Design Specification (Premium & Modern)
Rural Connect – Centralized Rural Grievance Resolution System

STRICT IMPLEMENTATION INSTRUCTIONS:
- Build clean, modern, professional dashboards
- Follow consistent layout across all roles
- Use reusable components
- Ensure smooth UX and fast navigation
- Fully responsive (desktop + mobile)

---

## 1. GLOBAL DASHBOARD LAYOUT

### Structure:

[ Sidebar ] | [ Main Content Area ]

### Sidebar:
- Fixed (left side)
- Width: 250px
- Dark theme (blue/black)

### Main Area:
- Top Navbar
- Page Content

---

## 2. SIDEBAR (PREMIUM)

### Style:
- Background: #0B3C5D
- Text: white
- Active item: highlight (orange)

### Features:
- Icons + labels
- Collapsible (icon-only mode)
- Smooth hover effect

---

## 3. TOP NAVBAR

### Right Side:
- 🔔 Notifications
- 👤 Profile dropdown
- 🌐 Language toggle

### Style:
- White background
- Light shadow
- Sticky

---

## 4. COMMON UI COMPONENTS

### Cards:
- Rounded: 16px
- Shadow: soft
- Padding: 20px

### Tables:
- Clean UI
- Hover row highlight
- Pagination

### Buttons:
- Primary (orange)
- Secondary (blue/grey)

---

## 5. CITIZEN DASHBOARD

### Sidebar Menu:
- Dashboard
- Raise Complaint
- My Complaints
- Track Complaint
- Community
- Chatbot Help
- Notifications
- Profile
- Settings

---

### Dashboard Overview Page:

Cards:
- Total Complaints
- Pending
- Resolved
- Escalated

Recent Activity:
- Timeline list

---

### Raise Complaint Page:

Form:
- Category dropdown
- Description
- Upload image/video
- Submit button

---

### My Complaints:

Table:
- ID
- Category
- Status
- Date
- Action (View)

---

### Track Complaint:

Timeline UI:
- Vertical stepper
- Status + time

---

## 6. PRADHAN DASHBOARD

### Sidebar Menu:
- Dashboard
- Incoming Complaints
- All Complaints
- Escalated Cases
- Community Monitoring
- Reports & Analytics
- Notifications
- Profile
- Settings

---

### Incoming Complaints Page:

Card/List View:
- Complaint details
- Media preview

Dynamic Actions:
- Accept / Reject

---

### Complaint Detail Page (IMPORTANT)

Show:
- Full complaint
- Media
- User details

### Dynamic Action Buttons:

STEP 1:
- Accept / Reject

STEP 2:
- Start Inspection

STEP 3:
- Verify / Reject

STEP 4:
- Resolve

Rules:
- Only current step visible
- Previous disabled

---

### All Complaints:

Tabs:
- Verified
- In Progress
- Rejected

---

## 7. DISTRICT DASHBOARD

### Sidebar Menu:
- Dashboard
- All Complaints
- Escalated Complaints
- Rejected Complaints
- Pradhan Performance
- Analytics & Reports
- Notifications
- Profile
- Settings

---

### Escalated Complaints:

List:
- Complaint details

Actions:
- Accept (with deadline)
- Reject (with reason)

---

### Analytics Page:

Charts:
- Complaints by category
- Resolution time
- Pending vs resolved

---

## 8. TIMELINE UI (VERY IMPORTANT)

### Style:
- Vertical line
- Status dots

Each step:
- Status name
- Time
- Actor
- Remarks

---

## 9. COMMUNITY UI

### Layout:
- Left: messages
- Right: members

Features:
- Chat bubbles
- Media preview
- Reactions

---

## 10. NOTIFICATION UI

- Dropdown in navbar
- List view page
- Mark as read

---

## 11. CHATBOT

- Floating button
- Expandable panel

---

## 12. ANIMATIONS

- Hover effects
- Smooth transitions
- Fade-in on load

---

## 13. RESPONSIVENESS

### Mobile:
- Sidebar collapses
- Hamburger menu
- Cards stacked

---

## 14. UX RULES

- Show only required actions
- Avoid clutter
- Use color-coded statuses

---

## 15. STATUS COLORS

- Pending → Yellow
- In Progress → Blue
- Resolved → Green
- Rejected → Red
- Escalated → Orange

---

## 16. OUTPUT REQUIREMENT

Dashboards must:
- Look modern and premium
- Be easy to use
- Follow role-based UI
- Have smooth navigation
- Maintain clean layout