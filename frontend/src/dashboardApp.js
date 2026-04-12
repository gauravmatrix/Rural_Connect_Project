import client, { getErrorMessage } from "./api/client";

const AUTH_KEY = "rc_auth_session";
const STATE_KEY = "rc_dashboard_state_v1";

const roleMenus = {
  CITIZEN: [
    { key: "home", label: "Dashboard", icon: "home" },
    { key: "raise", label: "Raise Complaint", icon: "plus" },
    { key: "my", label: "My Complaints", icon: "list" },
    { key: "track", label: "Track Complaint", icon: "timeline" },
    { key: "community", label: "Community", icon: "chat" },
    { key: "chatbot", label: "Chatbot Help", icon: "bot" },
    { key: "notifications", label: "Notifications", icon: "bell" },
    { key: "profile", label: "Profile", icon: "user" },
    { key: "settings", label: "Settings", icon: "settings" },
  ],
  PRADHAN: [
    { key: "home", label: "Dashboard", icon: "home" },
    { key: "incoming", label: "Incoming Complaints", icon: "inbox" },
    { key: "all", label: "All Complaints", icon: "list" },
    { key: "escalated", label: "Escalated Cases", icon: "alert" },
    { key: "community", label: "Community Monitoring", icon: "chat" },
    { key: "reports", label: "Reports & Analytics", icon: "chart" },
    { key: "notifications", label: "Notifications", icon: "bell" },
    { key: "profile", label: "Profile", icon: "user" },
    { key: "settings", label: "Settings", icon: "settings" },
  ],
  DISTRICT: [
    { key: "home", label: "Dashboard", icon: "home" },
    { key: "all", label: "All Complaints", icon: "list" },
    { key: "escalated", label: "Escalated Complaints", icon: "alert" },
    { key: "rejected", label: "Rejected Complaints", icon: "close" },
    { key: "performance", label: "Pradhan Performance", icon: "chart" },
    { key: "analytics", label: "Analytics & Reports", icon: "chart" },
    { key: "notifications", label: "Notifications", icon: "bell" },
    { key: "profile", label: "Profile", icon: "user" },
    { key: "settings", label: "Settings", icon: "settings" },
  ],
};

const statusTone = {
  SUBMITTED: "tone-pending",
  ACCEPTED: "tone-progress",
  INSPECTION: "tone-progress",
  VERIFIED: "tone-resolved",
  RESOLVED: "tone-resolved",
  REJECTED: "tone-rejected",
  ESCALATED: "tone-escalated",
};

function nowIso() {
  return new Date().toISOString();
}

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function defaultState() {
  return {
    complaints: [
      {
        id: 1001,
        citizenName: "Ravi Kumar",
        citizenId: 101,
        category: "Water Supply",
        description: "Handpump not working for last 4 days.",
        mediaUrl: "",
        status: "SUBMITTED",
        createdAt: nowIso(),
        currentHandler: "PRADHAN",
        timeline: [
          { status: "SUBMITTED", actor: "Citizen", remarks: "Complaint submitted", at: nowIso() },
        ],
      },
      {
        id: 1002,
        citizenName: "Suman Devi",
        citizenId: 102,
        category: "Street Lighting",
        description: "Street lights near school are off.",
        mediaUrl: "",
        status: "VERIFIED",
        createdAt: nowIso(),
        currentHandler: "PRADHAN",
        timeline: [
          { status: "SUBMITTED", actor: "Citizen", remarks: "Complaint submitted", at: nowIso() },
          { status: "ACCEPTED", actor: "Pradhan", remarks: "Accepted for review", at: nowIso() },
          { status: "INSPECTION", actor: "Pradhan", remarks: "Inspection in progress", at: nowIso() },
          { status: "VERIFIED", actor: "Pradhan", remarks: "Verification complete", at: nowIso() },
        ],
      },
    ],
    notifications: [
      { id: 1, role: "CITIZEN", message: "Your complaint #1002 moved to VERIFIED.", read: false, at: nowIso() },
      { id: 2, role: "PRADHAN", message: "New complaint #1001 assigned to you.", read: false, at: nowIso() },
      { id: 3, role: "DISTRICT", message: "Escalation summary generated.", read: false, at: nowIso() },
    ],
    communityMessages: [
      { id: 1, author: "Citizen", text: "Road near bus stop needs urgent repair.", at: nowIso() },
      { id: 2, author: "Pradhan", text: "Team scheduled for inspection tomorrow.", at: nowIso() },
    ],
    settings: {
      emailNotifications: true,
      language: "EN",
      theme: "default",
    },
  };
}

function loadState() {
  const raw = localStorage.getItem(STATE_KEY);
  return raw ? safeParse(raw, defaultState()) : defaultState();
}

function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

export function getAuthSession() {
  return safeParse(localStorage.getItem(AUTH_KEY), null);
}

export function setAuthSession(session) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}

function icon(name) {
  const icons = {
    home: "⌂",
    plus: "+",
    list: "☰",
    timeline: "↕",
    chat: "💬",
    bot: "🤖",
    bell: "🔔",
    user: "👤",
    settings: "⚙",
    inbox: "⌁",
    alert: "⚠",
    chart: "◴",
    close: "✕",
  };
  return icons[name] || "•";
}

function statusChip(status) {
  return `<span class="status-chip ${statusTone[status] || "tone-progress"}">${status}</span>`;
}

function sidebar(role, pageKey) {
  const menu = roleMenus[role] || roleMenus.CITIZEN;
  // Split nav: main links (exclude profile/settings/logout), bottom links (profile/settings/logout)
  const mainNav = menu.filter(item => !["profile","settings"].includes(item.key));
  const bottomNav = menu.filter(item => ["profile","settings"].includes(item.key));
  return `
    <div class="rcz-sidebar-inner">
      <div class="rcz-brand">
        <span class="rcz-hamburger" id="rczHamburger">☰</span>
        <h3>RuralConnect</h3>
      </div>
      <nav class="rcz-nav rcz-nav-main">
        ${mainNav.map(item => `<a href="#/dashboard/${item.key}" class="rcz-nav-item ${item.key === pageKey ? "active" : ""}"><span class="rcz-nav-icon">${icon(item.icon)}</span><span class="rcz-nav-label">${item.label}</span></a>`).join("")}
      </nav>
      <div class="rcz-nav-bottom">
        ${bottomNav.map(item => `<a href="#/dashboard/${item.key}" class="rcz-nav-item ${item.key === pageKey ? "active" : ""}"><span class="rcz-nav-icon">${icon(item.icon)}</span><span class="rcz-nav-label">${item.label}</span></a>`).join("")}
        <button id="dbLogoutBtn" class="rcz-nav-item rcz-logout"><span class="rcz-nav-icon">🚪</span><span class="rcz-nav-label">Logout</span></button>
      </div>
    </div>
  `;
}

function topbar(session, unreadCount) {
  return `<header class="db-topbar"><button class="db-menu-toggle" id="dbMenuToggle">☰</button><span class="db-protected">Protected Workspace</span><div class="db-top-right"><button id="dbNotifToggle" class="db-notif-btn">🔔 <b>${unreadCount}</b></button><button id="dbLangBtn" class="db-lang-btn">EN | हिंदी</button><div class="db-user">${session?.displayName || "User"}<small>${(session?.role || "").toLowerCase()}</small></div></div></header>`;
}

function dashboardCards(complaints) {
  const total = complaints.length;
  const pending = complaints.filter((c) => ["SUBMITTED", "ACCEPTED", "INSPECTION"].includes(c.status)).length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const escalated = complaints.filter((c) => c.status === "ESCALATED").length;
  return `<section class="db-cards"><article><h4>Total Complaints</h4><p>${total}</p></article><article><h4>Pending</h4><p>${pending}</p></article><article><h4>Resolved</h4><p>${resolved}</p></article><article><h4>Escalated</h4><p>${escalated}</p></article></section>`;
}

function recentTimeline(complaints) {
  const rows = complaints
    .flatMap((c) => c.timeline.map((t) => ({ ...t, id: c.id })))
    .slice(-8)
    .reverse();
  return `<section class="db-panel"><h3>Recent Activity</h3><div class="db-timeline">${rows
    .map((row) => `<article class="db-timeline-item"><span class="dot"></span><div><p><b>#${row.id}</b> ${row.status}</p><small>${row.actor} • ${new Date(row.at).toLocaleString()}</small><p>${row.remarks}</p></div></article>`)
    .join("")}</div></section>`;
}

function complaintRows(items, actionKey = "view") {
  return `<table class="db-table"><thead><tr><th>ID</th><th>Category</th><th>Status</th><th>Date</th><th>Action</th></tr></thead><tbody>${items
    .map(
      (c) => `<tr><td>#${c.id}</td><td>${c.category}</td><td>${statusChip(c.status)}</td><td>${new Date(c.createdAt).toLocaleDateString()}</td><td><button data-action="${actionKey}" data-id="${c.id}" class="db-btn-secondary">View</button></td></tr>`,
    )
    .join("")}</tbody></table>`;
}

function citizenPage(pageKey, session, state) {
  const mine = state.complaints.filter((c) => c.citizenId === session.userId || session.role !== "CITIZEN");
  if (pageKey === "raise") {
    return `<section class="db-panel"><h3>Raise Complaint</h3><form id="citizenRaiseForm" class="db-form-grid"><label>Category<select name="category" required><option value="">Select Category</option><option>Water Supply</option><option>Street Lighting</option><option>Road Infrastructure</option><option>Sewage & Sanitation</option></select></label><label>Description<textarea name="description" required placeholder="Describe issue clearly"></textarea></label><label>Media URL (optional)<input name="mediaUrl" placeholder="https://..." /></label><button class="db-btn-primary" type="submit">Submit Complaint</button><p id="raiseMsg" class="db-msg"></p></form></section>`;
  }
  if (pageKey === "my") {
    return `<section class="db-panel"><h3>My Complaints</h3>${complaintRows(mine, "track")}</section>`;
  }
  if (pageKey === "track") {
    return `<section class="db-panel"><h3>Track Complaint</h3>${complaintRows(mine, "timeline")}</section>`;
  }
  if (pageKey === "community") {
    return `<section class="db-panel"><h3>Community</h3><div class="db-community"><div class="db-community-chat" id="communityFeed">${state.communityMessages
      .map((m) => `<p><b>${m.author}:</b> ${m.text}</p>`)
      .join("")}</div><form id="communityMsgForm" class="db-inline-form"><input name="message" placeholder="Write message..." required /><button class="db-btn-primary">Send</button></form></div></section>`;
  }
  if (pageKey === "chatbot") {
    return `<section class="db-panel"><h3>Chatbot Help</h3><form id="chatbotForm" class="db-inline-form"><input name="query" placeholder="Ask about complaint status, escalation, login help..." required /><button class="db-btn-primary">Ask</button></form><div id="chatbotReply" class="db-chatbot-reply"></div></section>`;
  }
  if (pageKey === "notifications") {
    return notificationsPage(session, state);
  }
  if (pageKey === "profile") {
    return profilePage(session);
  }
  if (pageKey === "settings") {
    return settingsPage(state.settings);
  }
  return `${dashboardCards(mine)}${recentTimeline(mine)}`;
}

function pradhanPage(pageKey, session, state) {
  const incoming = state.complaints.filter((c) => ["SUBMITTED", "ACCEPTED", "INSPECTION", "VERIFIED"].includes(c.status));
  const escalated = state.complaints.filter((c) => c.status === "ESCALATED");
  if (pageKey === "incoming") {
    return `<section class="db-panel"><h3>Incoming Complaints</h3><div class="db-list">${incoming
      .map(
        (c) => `<article class="db-complaint-card"><header><h4>#${c.id} • ${c.category}</h4>${statusChip(c.status)}</header><p>${c.description}</p><div class="db-actions">${pradhanActionButtons(c)}</div></article>`,
      )
      .join("")}</div></section>`;
  }
  if (pageKey === "all") {
    return `<section class="db-panel"><h3>All Complaints</h3>${complaintRows(state.complaints, "timeline")}</section>`;
  }
  if (pageKey === "escalated") {
    return `<section class="db-panel"><h3>Escalated Cases</h3>${complaintRows(escalated, "timeline")}</section>`;
  }
  if (pageKey === "community") return citizenPage("community", session, state);
  if (pageKey === "reports") return analyticsPanel(state.complaints, "Pradhan Reports & Analytics");
  if (pageKey === "notifications") return notificationsPage(session, state);
  if (pageKey === "profile") return profilePage(session);
  if (pageKey === "settings") return settingsPage(state.settings);
  return `${dashboardCards(state.complaints)}${recentTimeline(state.complaints)}`;
}

function districtPage(pageKey, session, state) {
  const escalated = state.complaints.filter((c) => c.status === "ESCALATED");
  const rejected = state.complaints.filter((c) => c.status === "REJECTED");
  if (pageKey === "all") return `<section class="db-panel"><h3>All Complaints</h3>${complaintRows(state.complaints, "timeline")}</section>`;
  if (pageKey === "escalated") {
    return `<section class="db-panel"><h3>Escalated Complaints</h3><div class="db-list">${escalated
      .map(
        (c) => `<article class="db-complaint-card"><header><h4>#${c.id} • ${c.category}</h4>${statusChip(c.status)}</header><p>${c.description}</p><div class="db-actions"><button class="db-btn-primary" data-action="district-accept" data-id="${c.id}">Accept</button><button class="db-btn-danger" data-action="district-reject" data-id="${c.id}">Reject</button></div></article>`,
      )
      .join("")}</div></section>`;
  }
  if (pageKey === "rejected") return `<section class="db-panel"><h3>Rejected Complaints</h3>${complaintRows(rejected, "timeline")}</section>`;
  if (pageKey === "performance") return performancePanel(state.complaints);
  if (pageKey === "analytics") return analyticsPanel(state.complaints, "District Analytics & Reports");
  if (pageKey === "notifications") return notificationsPage(session, state);
  if (pageKey === "profile") return profilePage(session);
  if (pageKey === "settings") return settingsPage(state.settings);
  return `${dashboardCards(state.complaints)}${recentTimeline(state.complaints)}`;
}

function pradhanActionButtons(c) {
  if (c.status === "SUBMITTED") {
    return `<button class="db-btn-primary" data-action="accept" data-id="${c.id}">Accept</button><button class="db-btn-danger" data-action="reject" data-id="${c.id}">Reject</button>`;
  }
  if (c.status === "ACCEPTED") return `<button class="db-btn-primary" data-action="inspection" data-id="${c.id}">Start Inspection</button>`;
  if (c.status === "INSPECTION") return `<button class="db-btn-primary" data-action="verify" data-id="${c.id}">Verify</button><button class="db-btn-danger" data-action="reject" data-id="${c.id}">Reject</button>`;
  if (c.status === "VERIFIED") return `<button class="db-btn-primary" data-action="resolve" data-id="${c.id}">Resolve</button><button class="db-btn-secondary" data-action="escalate" data-id="${c.id}">Escalate</button>`;
  return `<button class="db-btn-secondary" data-action="timeline" data-id="${c.id}">View Timeline</button>`;
}

function notificationsPage(session, state) {
  const items = state.notifications.filter((n) => n.role === session.role || n.role === "ALL");
  return `<section class="db-panel"><h3>Notifications</h3><div class="db-list">${items
    .map(
      (n) => `<article class="db-note ${n.read ? "read" : ""}"><p>${n.message}</p><small>${new Date(n.at).toLocaleString()}</small>${
        n.read ? "" : `<button class="db-btn-secondary" data-action="mark-read" data-id="${n.id}">Mark as read</button>`
      }</article>`,
    )
    .join("")}</div></section>`;
}

function profilePage(session) {
  return `<section class="db-panel"><h3>Profile</h3><form id="profileForm" class="db-form-grid"><label>Display Name<input name="displayName" value="${session.displayName || ""}" required /></label><label>Email<input value="${session.email || ""}" disabled /></label><label>Role<input value="${session.role}" disabled /></label><button class="db-btn-primary">Update Profile</button><p id="profileMsg" class="db-msg"></p></form></section>`;
}

function settingsPage(settings) {
  return `<section class="db-panel"><h3>Settings</h3><form id="settingsForm" class="db-form-grid"><label class="db-switch"><input type="checkbox" name="emailNotifications" ${
    settings.emailNotifications ? "checked" : ""
  } /><span>Enable email notifications</span></label><label>Language<select name="language"><option ${
    settings.language === "EN" ? "selected" : ""
  }>EN</option><option ${settings.language === "HI" ? "selected" : ""}>HI</option></select></label><button class="db-btn-primary">Save Settings</button><p id="settingsMsg" class="db-msg"></p></form></section>`;
}

function analyticsPanel(complaints, title) {
  const byStatus = complaints.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  return `<section class="db-panel"><h3>${title}</h3><div class="db-cards">${Object.entries(byStatus)
    .map(([status, count]) => `<article><h4>${status}</h4><p>${count}</p></article>`)
    .join("")}</div></section>`;
}

function performancePanel(complaints) {
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const rejected = complaints.filter((c) => c.status === "REJECTED").length;
  const inProgress = complaints.filter((c) => ["ACCEPTED", "INSPECTION", "VERIFIED"].includes(c.status)).length;
  return `<section class="db-panel"><h3>Pradhan Performance</h3><div class="db-cards"><article><h4>Resolved by Pradhan</h4><p>${resolved}</p></article><article><h4>In Progress</h4><p>${inProgress}</p></article><article><h4>Rejected</h4><p>${rejected}</p></article></div></section>`;
}

export function renderDashboard(routeSegment) {
  const session = getAuthSession();
  const state = loadState();
  const pageKey = routeSegment || "home";
  const role = session?.role || "CITIZEN";
  const unreadCount = state.notifications.filter((n) => (n.role === role || n.role === "ALL") && !n.read).length;

  let body = "";
  if (role === "PRADHAN") body = pradhanPage(pageKey, session, state);
  else if (role === "DISTRICT") body = districtPage(pageKey, session, state);
  else body = citizenPage(pageKey, session, state);

  // Reference-style SaaS layout (HealthZen-inspired, RuralConnect theme)
  const html = `
    <div class="rcz-root">
      <aside class="rcz-sidebar">${sidebar(role, pageKey)}</aside>
      <div class="rcz-main">
        <header class="rcz-topbar">
          <div class="rcz-topbar-left">
            <span class="rcz-protected">Protected Workspace</span>
          </div>
          <div class="rcz-topbar-right">
            <div class="rcz-user-info">
              <span class="rcz-user-name">${session?.displayName || "User"}</span>
              <span class="rcz-user-role">${(session?.role || "").toLowerCase()}</span>
            </div>
          </div>
        </header>
        <main class="rcz-content">
          ${body}
        </main>
      </div>
    </div>
  `;
  return { html, role, pageKey };
}

function addTimeline(complaint, status, actor, remarks) {
  complaint.status = status;
  complaint.timeline.push({ status, actor, remarks, at: nowIso() });
}

function createNotification(state, role, message) {
  state.notifications.push({
    id: state.notifications.length ? Math.max(...state.notifications.map((n) => n.id)) + 1 : 1,
    role,
    message,
    read: false,
    at: nowIso(),
  });
}

function findComplaint(state, id) {
  return state.complaints.find((c) => c.id === Number(id));
}

export function bindDashboardEvents({ role, pageKey }) {
  const state = loadState();
  const session = getAuthSession();

  // Responsive hamburger menu for sidebar
  const hamburger = document.getElementById("rczHamburger");
  const sidebar = document.querySelector(".rcz-sidebar");
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
  // Close sidebar on nav click (mobile)
  document.querySelectorAll(".rcz-nav-item").forEach((el) => {
    el.addEventListener("click", () => {
      if (window.innerWidth <= 900 && sidebar) sidebar.classList.remove("open");
    });
  });
  // Logout button
  const logoutBtn = document.getElementById("dbLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearAuthSession();
      localStorage.removeItem("rc_token");
      window.location.hash = "#/login";
    });
  }

  const profileForm = document.querySelector("#profileForm");
  if (profileForm && session) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(profileForm);
      session.displayName = data.get("displayName");
      setAuthSession(session);
      const msg = document.querySelector("#profileMsg");
      if (msg) msg.textContent = "Profile updated.";
    });
  }

  const settingsForm = document.querySelector("#settingsForm");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(settingsForm);
      state.settings.emailNotifications = data.get("emailNotifications") === "on";
      state.settings.language = data.get("language") || "EN";
      saveState(state);
      const msg = document.querySelector("#settingsMsg");
      if (msg) msg.textContent = "Settings saved.";
    });
  }

  const raiseForm = document.querySelector("#citizenRaiseForm");
  if (raiseForm && session) {
    raiseForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(raiseForm);
      const payload = {
        category: data.get("category"),
        description: data.get("description"),
        mediaUrl: data.get("mediaUrl") || null,
      };
      const msg = document.querySelector("#raiseMsg");
      try {
        const { data: apiData } = await client.post("/api/v1/complaints", payload);
        const complaint = {
          id: apiData?.id || Date.now(),
          citizenName: session.displayName || "Citizen",
          citizenId: session.userId,
          category: payload.category,
          description: payload.description,
          mediaUrl: payload.mediaUrl || "",
          status: apiData?.status || "SUBMITTED",
          createdAt: nowIso(),
          currentHandler: "PRADHAN",
          timeline: [{ status: "SUBMITTED", actor: "Citizen", remarks: "Complaint submitted", at: nowIso() }],
        };
        state.complaints.unshift(complaint);
        createNotification(state, "PRADHAN", `New complaint #${complaint.id} submitted by citizen.`);
        saveState(state);
        raiseForm.reset();
        if (msg) msg.textContent = "Complaint submitted successfully.";
      } catch (error) {
        if (msg) msg.textContent = getErrorMessage(error);
      }
    });
  }

  const communityForm = document.querySelector("#communityMsgForm");
  if (communityForm && session) {
    communityForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(communityForm);
      const text = String(data.get("message") || "").trim();
      if (!text) return;
      state.communityMessages.push({ id: Date.now(), author: session.displayName || role, text, at: nowIso() });
      saveState(state);
      window.location.reload();
    });
  }

  const chatbotForm = document.querySelector("#chatbotForm");
  if (chatbotForm) {
    chatbotForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(chatbotForm);
      const query = String(data.get("query") || "").trim();
      const out = document.querySelector("#chatbotReply");
      if (!query) return;
      if (out) out.textContent = "Thinking...";
      try {
        const res = await client.post("/api/v1/chatbot/query", { query });
        if (out) out.textContent = res?.data?.reply || "No response.";
      } catch {
        if (out) out.textContent = "Please raise complaint from Raise Complaint page and track status in Track Complaint.";
      }
    });
  }

  document.querySelectorAll("[data-action='mark-read']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      const note = state.notifications.find((n) => n.id === id);
      if (note) note.read = true;
      saveState(state);
      window.location.reload();
    });
  });

  const transitionHandlers = {
    accept: { status: "ACCEPTED", actor: "Pradhan", remark: "Accepted for processing" },
    inspection: { status: "INSPECTION", actor: "Pradhan", remark: "Inspection started" },
    verify: { status: "VERIFIED", actor: "Pradhan", remark: "Verified after inspection" },
    resolve: { status: "RESOLVED", actor: "Pradhan", remark: "Issue resolved" },
    reject: { status: "REJECTED", actor: "Pradhan", remark: "Rejected with remarks" },
    escalate: { status: "ESCALATED", actor: "Pradhan", remark: "Escalated to district" },
    "district-accept": { status: "ACCEPTED", actor: "District", remark: "District accepted escalation" },
    "district-reject": { status: "REJECTED", actor: "District", remark: "District rejected escalation" },
  };

  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      const id = btn.getAttribute("data-id");
      if (!id || !(action in transitionHandlers)) return;
      const complaint = findComplaint(state, id);
      if (!complaint) return;
      const t = transitionHandlers[action];
      addTimeline(complaint, t.status, t.actor, t.remark);
      if (t.status === "ESCALATED") createNotification(state, "DISTRICT", `Complaint #${complaint.id} escalated.`);
      if (t.status === "RESOLVED" || t.status === "REJECTED") createNotification(state, "CITIZEN", `Complaint #${complaint.id} moved to ${t.status}.`);
      saveState(state);
      window.location.reload();
    });
  });

  if (pageKey === "track") {
    document.querySelectorAll("[data-action='timeline']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-id"));
        const complaint = findComplaint(state, id);
        if (!complaint) return;
        const timeline = complaint.timeline
          .map((t) => `${t.status} • ${t.actor} • ${new Date(t.at).toLocaleString()}\n${t.remarks}`)
          .join("\n\n");
        alert(`Complaint #${complaint.id}\n\n${timeline}`);
      });
    });
  }
}
