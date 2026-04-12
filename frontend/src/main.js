import "./styles.css";
import { loginUser, registerUser, verifyOtp } from "./api/authApi";
import { getErrorMessage } from "./api/client";
import Swiper from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { bindDashboardEvents, clearAuthSession, getAuthSession, renderDashboard, setAuthSession } from "./dashboardApp";

const app = document.querySelector("#app");
const otpEmailStateKey = "rc_otp_email";
const pendingSectionKey = "rc_pending_section";
let heroSwiper;

const sectionLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

const heroSlides = [
  {
    image: "/images/rural/rural-family.png",
    heading: "Empowering Rural Voices",
    subheading:
      "A digital platform connecting citizens with authorities for faster grievance resolution.",
  },
  {
    image: "/images/rural/digital-plan.png",
    heading: "Digital Governance for Villages",
    subheading:
      "Bringing transparency, accountability, and efficiency to rural administration.",
  },
  {
    image: "/images/rural/sustainable-developemnt.png",
    heading: "Supporting Rural Development",
    subheading:
      "Address issues related to water, roads, farming, and essential services.",
  },
  {
    image: "/images/rural/digital-classroom.png",
    heading: "Building Better Futures",
    subheading:
      "Improving quality of life through timely resolution of public issues.",
  },
];

const serviceCards = [
  {
    title: "Water Supply",
    description: "Issues related to water taps, pipelines, and availability",
    image: "/images/rural/water-tap.png",
  },
  {
    title: "Street Lighting",
    description: "Faulty or missing street lights in villages",
    image: "/images/rural/street-light.png",
  },
  {
    title: "Road Infrastructure",
    description: "Damaged roads, potholes, and construction issues",
    image: "/images/rural/rural-road.png",
  },
  {
    title: "Sewage & Sanitation",
    description: "Drainage problems and sanitation concerns",
    image: "/images/rural/water-canal.png",
  },
  {
    title: "Government Schemes",
    description: "Issues related to ration cards, Awaas Yojna, etc.",
    image: "/images/rural/rural-healthcare.png",
  },
  {
    title: "Education",
    description: "School infrastructure, classroom facilities, and learning support issues",
    image: "/images/rural/school-children.png",
  },
];

const workflowSteps = [
  {
    title: "Raise Complaint",
    description: "Citizen submits issue with details and media proof.",
    icon: "file-text",
  },
  {
    title: "Pradhan Review",
    description: "Local authority reviews and takes action.",
    icon: "users",
  },
  {
    title: "Verification & Resolution",
    description: "Issue is inspected and resolved within timeline.",
    icon: "check-circle",
  },
  {
    title: "Escalation (If Needed)",
    description: "If unresolved, it automatically escalates to district level.",
    icon: "alert-triangle",
  },
];

const impactStats = [
  {
    label: "Complaints Resolved",
    value: 10000,
    suffix: "+",
    description: "Successfully resolved issues across villages",
    icon: "analytics",
  },
  {
    label: "Active Users",
    value: 5000,
    suffix: "+",
    description: "Citizens actively using the platform",
    icon: "users",
  },
  {
    label: "Villages Connected",
    value: 200,
    suffix: "+",
    description: "Rural areas benefiting from digital governance",
    icon: "home",
  },
  {
    label: "Avg Resolution Time",
    value: 5,
    suffix: " Days",
    prefix: "3-",
    description: "Faster response and resolution",
    icon: "clock",
  },
];

function icon(name) {
  const icons = {
    analytics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M7 15l4-4 3 3 5-6"></path></svg>`,
    "file-text": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-6h6v6"></path></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    "check-circle": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg>`,
    "alert-triangle": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  };
  return icons[name] || icons["file-text"];
}

function authIcon(name) {
  const icons = {
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    age: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.4 2.1L8.1 9.6a16 16 0 0 0 6.3 6.3l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z"></path></svg>',
    village: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-5h6v5"></path></svg>',
    city: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l7-4v18"></path><path d="M12 8h7v13"></path><path d="M9 10h1"></path><path d="M9 14h1"></path><path d="M9 18h1"></path><path d="M15 12h1"></path><path d="M15 16h1"></path></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z"></path><circle cx="12" cy="10" r="2.4"></circle></svg>',
    role: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"></path><path d="M7 3v4"></path><path d="M17 3v4"></path><rect x="3" y="7" width="18" height="14" rx="2"></rect><path d="M8 12h8"></path><path d="M8 16h5"></path></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 5 3.4 7.7 7 9 3.6-1.3 7-4 7-9V6z"></path><path d="m9.5 12.5 1.7 1.7 3.3-3.3"></path></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1.1 6.1L12 17l-5.5 2.8 1.1-6.1-4.4-4.3 6.1-.9z"></path></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"></path></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.9 4.2L18 9.1l-4.1 1.9L12 15l-1.9-4-4.1-1.9 4.1-1.9z"></path><path d="M5 18h.01"></path><path d="M19 18h.01"></path></svg>',
  };
  return icons[name] || icons.user;
}

function eyeIcon(show) {
  return show
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 18 18"></path><path d="M10.6 10.7a2 2 0 0 0 2.8 2.8"></path><path d="M9.4 5.1A10.9 10.9 0 0 1 12 4c5.8 0 9.5 4.8 10 8-.2 1.2-.9 2.8-2.2 4.2"></path><path d="M6.6 6.7C4.7 8 3.5 9.9 3 12c.5 3.2 4.2 8 9 8 1.8 0 3.4-.5 4.9-1.4"></path></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.8-8 10-8 10 8 10 8-3.8 8-10 8-10-8-10-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
}

function navbar() {
  return `
    <header id="rcNavbar" class="rc-navbar fixed inset-x-0 top-0 z-50 bg-[#f6f6f2]/95 pt-3 backdrop-blur-sm transition-all duration-300">
      <div class="mx-auto w-full max-w-[112rem] px-3 sm:px-4 lg:px-5">
        <div class="flex h-[76px] items-center justify-between rounded-2xl border border-white/50 bg-white/65 px-4 shadow-[0_10px_38px_-20px_rgba(37,99,235,0.45)] backdrop-blur-xl transition-all duration-300 sm:px-5 lg:h-[84px] lg:px-6">
          <a href="#/" class="logo-glow group flex items-center gap-3 transition duration-300 hover:scale-[1.03]">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#F97316] text-white shadow-[0_10px_18px_-12px_rgba(37,99,235,0.8)]">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-6h6v6"></path></svg>
            </span>
            <span class="text-xl font-extrabold tracking-tight"><span class="text-[#F97316]">Rural</span><span class="text-[#2563EB]">Connect</span></span>
          </a>
          <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary Navigation">
            ${sectionLinks.map((l) => `<a href="#${l.id}" data-section-link="${l.id}" class="nav-link">${l.label}</a>`).join("")}
          </nav>
          <div class="hidden items-center gap-3 md:flex">
            <button class="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB]">EN | हिंदी</button>
            <a href="#/login" class="rounded-full border border-[#2563EB] px-4 py-2 text-sm font-semibold text-[#2563EB] transition hover:scale-105 hover:bg-blue-50">Login</a>
            <a href="#/register" class="rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-orange-500">Register</a>
          </div>
          <button id="menuOpenBtn" class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/85 text-slate-700 md:hidden"><span class="text-xl leading-none">≡</span></button>
        </div>
      </div>
    </header>
    <div id="mobileMenuOverlay" class="fixed inset-0 z-[60] hidden bg-slate-900/45 opacity-0 transition-opacity duration-300"></div>
    <aside id="mobileMenuPanel" class="fixed right-0 top-0 z-[70] h-full w-[84%] max-w-sm translate-x-full border-l border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300">
      <div class="flex items-center justify-between">
        <span class="text-lg font-extrabold"><span class="text-[#F97316]">Rural</span><span class="text-[#2563EB]">Connect</span></span>
        <button id="menuCloseBtn" class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700">✕</button>
      </div>
      <nav class="mt-8 flex flex-col gap-2">${sectionLinks.map((l) => `<a href="#${l.id}" data-section-link="${l.id}" class="nav-link rounded-xl px-3 py-2 text-base">${l.label}</a>`).join("")}</nav>
    </aside>
  `;
}

function shell(content) {
  return `${navbar()}<div class="mx-auto w-full max-w-[112rem] px-3 pb-0 pt-28 sm:px-4 lg:px-5 lg:pt-32 xl:px-6">${content}</div>`;
}

function authFooter() {
  return `<footer class="mt-6 overflow-hidden rounded-t-[1.6rem] bg-[#0b1220] text-slate-200"><div class="grid gap-8 px-6 py-9 sm:px-8 lg:grid-cols-3 lg:px-10"><div><h3 class="text-2xl font-extrabold text-white">Rural Connect</h3><p class="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">Digital-first governance platform for transparent grievance resolution and stronger rural engagement.</p><div class="mt-4 flex items-center gap-3"><a href="#" class="footer-social">f</a><a href="#" class="footer-social">x</a><a href="#" class="footer-social">▶</a><a href="#" class="footer-social">in</a></div></div><div><h4 class="text-base font-bold text-white">Quick Links</h4><ul class="mt-4 space-y-2 text-sm text-slate-400"><li><a href="#home" class="footer-link">Home</a></li><li><a href="#about" class="footer-link">About</a></li><li><a href="#services" class="footer-link">Services</a></li><li><a href="#community" class="footer-link">Community</a></li><li><a href="#contact" class="footer-link">Contact</a></li></ul></div><div><h4 class="text-base font-bold text-white">Contact Info</h4><div class="mt-4 space-y-2 text-sm text-slate-400"><p>support@ruralconnect.in</p><p>+91 9876543210</p><p>District Office, Haryana, India</p></div></div></div><div class="border-t border-slate-800 px-6 py-3 text-xs text-slate-400 sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10"><p>© 2026 Rural Connect. All rights reserved.</p><p class="mt-2 sm:mt-0"><a href="#" class="footer-link">Privacy Policy</a><span class="px-2">|</span><a href="#" class="footer-link">Terms & Conditions</a></p></div></footer>`;
}

function homePage() {
  return shell(`
    <section id="home" class="scroll-mt-32">
      <div class="hero-swiper swiper rise-in relative mx-auto w-full overflow-hidden rounded-[1.6rem]">
        <div class="swiper-wrapper">
          ${heroSlides.map((slide) => `
            <article class="swiper-slide hero-slide-item relative h-[26vh] min-h-[180px] md:h-[250px] md:min-h-[250px] lg:h-[270px] lg:min-h-[270px]">
              <img src="${slide.image}" alt="${slide.heading}" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent"></div>
              <div class="absolute inset-0 flex items-end md:items-center">
                <div class="hero-slide-content mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-8 text-center sm:px-7 md:items-start md:pb-0 md:pl-10 md:pr-16 md:text-left lg:max-w-7xl lg:pl-14 lg:pr-24">
                  <span class="mb-2 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white backdrop-blur">RURAL CONNECT PLATFORM</span>
                  <h1 class="max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl md:font-black lg:text-6xl">${slide.heading}</h1>
                  <p class="mt-2 max-w-2xl text-xs leading-relaxed text-slate-100 sm:text-base md:mt-3 md:text-lg md:leading-relaxed">${slide.subheading}</p>
                  <div class="mt-4 flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row md:justify-start">
                    <a href="#/register" class="hero-btn-primary">Raise Complaint</a>
                    <a href="#/verify-otp" class="hero-btn-secondary">Track Complaint</a>
                  </div>
                </div>
              </div>
            </article>`).join("")}
        </div>
        <button class="hero-swiper-prev absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/20 text-white backdrop-blur md:grid">❮</button>
        <button class="hero-swiper-next absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/20 text-white backdrop-blur md:grid">❯</button>
        <div class="hero-swiper-pagination absolute bottom-7 left-0 right-0 z-20"></div>
      </div>
    </section>

    <section id="about" class="mt-6 scroll-mt-32">
      <div class="glass-card overflow-hidden p-5 sm:p-7 lg:p-9">
        <div class="grid gap-4 lg:gap-5">
          <div class="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
            <article class="reveal reveal-left rounded-2xl border border-slate-100 bg-white/85 p-5 shadow-sm sm:p-6">
              <p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">About Rural Connect</p>
              <h2 class="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Transforming Rural Governance Through Digital Innovation</h2>
              <p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">Rural Connect is a centralized digital platform designed to bridge the gap between rural citizens and local authorities.</p>
              <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">In many villages, people struggle to get their basic issues resolved due to delays, lack of transparency, and inefficient communication.</p>
              <div class="about-top-chips mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <div class="about-top-chip about-top-chip-1"><span class="about-top-chip-icon">🛰</span><span>Digital Access</span></div>
                <div class="about-top-chip about-top-chip-2"><span class="about-top-chip-icon">📍</span><span>Local Reach</span></div>
                <div class="about-top-chip about-top-chip-3"><span class="about-top-chip-icon">🔒</span><span>Secure Platform</span></div>
                <div class="about-top-chip about-top-chip-4"><span class="about-top-chip-icon">🤝</span><span>Citizen First</span></div>
              </div>
            </article>
            <figure class="about-image-wrap reveal reveal-right group relative overflow-hidden rounded-2xl"><img src="/images/rural/digital-india.png" alt="Digital India rural connectivity" class="about-image" /><div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div></figure>
          </div>
          <div class="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
            <figure class="about-image-wrap reveal reveal-left group relative order-2 overflow-hidden rounded-2xl lg:order-1"><img src="/images/rural/about-digital-dashboard.png" alt="Smart dashboard and analytics" class="about-image" /><div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div></figure>
            <article class="reveal reveal-right order-1 rounded-2xl border border-slate-100 bg-white/85 p-5 shadow-sm sm:p-6 lg:order-2">
              <h3 class="text-lg font-extrabold text-slate-900 sm:text-xl">Key Benefits</h3>
              <div class="mt-5 grid gap-3 sm:grid-cols-2">
                <div class="feature-chip feature-chip-1"><span class="feature-icon">◉</span><span>Transparent complaint tracking system</span></div>
                <div class="feature-chip feature-chip-2"><span class="feature-icon">⚡</span><span>Faster issue resolution with defined timelines</span></div>
                <div class="feature-chip feature-chip-3"><span class="feature-icon">✉</span><span>Direct communication with authorities</span></div>
                <div class="feature-chip feature-chip-4"><span class="feature-icon">⇧</span><span>Automatic escalation for unresolved issues</span></div>
                <div class="feature-chip feature-chip-5"><span class="feature-icon">👥</span><span>Community-driven problem reporting</span></div>
                <div class="feature-chip feature-chip-6"><span class="feature-icon">✓</span><span>Status updates through every stage</span></div>
              </div>
              <div class="mt-7"><a href="#/register" class="hero-btn-primary">Raise Your First Complaint</a></div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="mt-6 scroll-mt-32">
      <header class="reveal text-center">
        <p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">Services</p>
        <h2 class="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Addressing Key Rural Issues Efficiently</h2>
        <p class="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">Rural Connect enables citizens to report and resolve essential public service issues quickly and transparently.</p>
      </header>
      <div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${serviceCards.map((s, i) => `<article class="service-card reveal group relative overflow-hidden rounded-2xl" style="transition-delay:${Math.min(i * 70, 280)}ms;"><img src="${s.image}" alt="${s.title}" class="service-media h-[290px] w-full object-cover" /><div class="service-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent"></div><div class="service-bottom-tint service-tint-${(i % 6) + 1} absolute inset-x-0 bottom-0 h-[34%]"></div><div class="absolute inset-x-0 bottom-0 z-10 p-5"><h3 class="text-xl font-bold text-white">${s.title}</h3><p class="mt-2 text-sm leading-relaxed text-slate-100">${s.description}</p></div></article>`).join("")}</div>
    </section>

    <section id="how-it-works" class="mt-6 scroll-mt-32">
      <header class="reveal text-center"><p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">How It Works</p><h2 class="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Simple Process. Transparent Governance.</h2><p class="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">From complaint submission to resolution, every step is transparent and trackable.</p></header>
      <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">${workflowSteps.map((step, i) => `<article class="workflow-card workflow-card-${(i % 4) + 1} reveal rounded-full p-5 shadow-[0_16px_38px_-24px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6" style="transition-delay:${Math.min(i * 120, 360)}ms;"><span class="workflow-step-index">${i + 1}</span><div class="workflow-card-icon">${icon(step.icon)}</div><h3 class="mt-4 text-center text-lg font-bold text-slate-900">${step.title}</h3><p class="mt-2 text-center text-sm leading-relaxed text-slate-700">${step.description}</p></article>`).join("")}</div>
    </section>

    <section id="impact" class="mt-6 scroll-mt-32">
      <div class="glass-card p-6 sm:p-8 lg:p-10"><header class="reveal text-center"><p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">Our Impact</p><h2 class="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Driving Change Across Rural Communities</h2><p class="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">Empowering villages with transparency, accountability, and faster grievance resolution.</p></header><div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">${impactStats.map((st, i) => `<article class="impact-card impact-card-${(i % 4) + 1} reveal rounded-2xl border border-white/70 bg-white/85 p-6 text-center shadow-[0_16px_36px_-24px_rgba(15,23,42,0.45)] backdrop-blur" style="transition-delay:${Math.min(i * 80, 320)}ms;"><span class="impact-icon">${icon(st.icon)}</span><p class="mt-4 text-sm font-semibold uppercase tracking-[0.06em] text-slate-600">${st.label}</p><p class="mt-2 text-3xl font-extrabold text-[#F97316] sm:text-4xl" data-counter data-target="${st.value}" data-prefix="${st.prefix || ""}" data-suffix="${st.suffix || ""}">0</p><p class="mt-3 text-sm leading-relaxed text-slate-600">${st.description}</p></article>`).join("")}</div></div>
    </section>

    <section id="community" class="mt-6 scroll-mt-32">
      <div class="glass-card overflow-hidden p-6 sm:p-8 lg:p-10"><div class="grid items-start gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"><article class="reveal reveal-left"><p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">Community</p><h2 class="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Connect, Discuss, and Raise Issues Together</h2><p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">Rural Connect offers a community platform where villagers can come together, discuss common issues, and raise concerns collectively.</p><p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">Just like a group chat, citizens can share problems, interact with others, and bring attention to critical issues affecting the entire village.</p><p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">This ensures faster action, better awareness, and stronger community engagement.</p><ul class="mt-6 grid gap-3 sm:grid-cols-2"><li class="community-point community-point-1"><span class="community-point-icon">💬</span><span>Real-time discussion among villagers</span></li><li class="community-point community-point-2"><span class="community-point-icon">📌</span><span>Share common problems</span></li><li class="community-point community-point-3"><span class="community-point-icon">🏛</span><span>Engage directly with local authorities</span></li><li class="community-point community-point-4"><span class="community-point-icon">📣</span><span>Increase awareness and collective action</span></li></ul><div class="mt-7"><a href="#/register" class="hero-btn-primary">Join Community</a></div></article><aside class="reveal reveal-right"><div class="community-chat-card"><header class="community-chat-header"><div class="community-avatar">VC</div><div><p class="text-sm font-bold text-slate-900">Village Community</p><p class="text-xs text-slate-500">128 members online</p></div></header><div class="mt-5 space-y-3"><div class="chat-row is-citizen chat-seq" style="transition-delay:60ms;"><span class="chat-avatar">C</span><div class="chat-bubble chat-citizen">Street light is not working</div></div><div class="chat-row is-citizen chat-seq" style="transition-delay:180ms;"><span class="chat-avatar">C</span><div class="chat-bubble chat-citizen">Same issue near school</div></div><div class="chat-row is-pradhan chat-seq" style="transition-delay:320ms;"><span class="chat-avatar pradhan">P</span><div class="chat-bubble chat-pradhan">We will inspect tomorrow</div></div><div class="chat-typing chat-seq" style="transition-delay:420ms;"><span></span><span></span><span></span></div></div></div></aside></div></div>
    </section>

    <section id="cta" class="mt-6 scroll-mt-32"><div class="reveal overflow-hidden rounded-[1.8rem] bg-gradient-to-r from-[#2563EB] via-[#2A6CF0] to-[#F97316] px-6 py-12 text-center shadow-[0_24px_46px_-26px_rgba(37,99,235,0.7)] sm:px-10 sm:py-14"><p class="text-xs font-semibold uppercase tracking-[0.13em] text-white/90">Get Started Today</p><h2 class="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">Raise Your Voice. Get Your Issues Resolved.</h2><p class="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-blue-50 sm:text-base">Join Rural Connect and experience transparent, fast, and efficient grievance resolution.</p><div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="#/register" class="hero-btn-primary text-base">Raise Complaint</a><a href="#/verify-otp" class="rounded-full border border-white px-7 py-3 text-base font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-[#1e293b]">Track Complaint</a></div></div></section>

    <section id="contact" class="mt-6 scroll-mt-32"><div class="glass-card p-6 sm:p-8 lg:p-10"><header class="reveal mb-6 text-center"><h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Contact Us</h2></header><div class="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><article class="reveal reveal-left rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h3 class="text-xl font-bold text-slate-900">Reach Our Support Team</h3><p class="mt-2 text-sm text-slate-600">We are here to help citizens and local authorities with platform usage and grievance workflow support.</p><div class="mt-6 space-y-3"><div class="contact-item"><span class="contact-item-icon">✉</span><a class="text-sm font-medium text-slate-700 hover:text-[#F97316]" href="mailto:support@ruralconnect.in">support@ruralconnect.in</a></div><div class="contact-item"><span class="contact-item-icon">☎</span><a class="text-sm font-medium text-slate-700 hover:text-[#F97316]" href="tel:+919876543210">+91 9876543210</a></div><div class="contact-item items-start"><span class="contact-item-icon">⌂</span><p class="text-sm font-medium text-slate-700">District Office, Haryana, India</p></div></div></article><form id="contactForm" class="reveal reveal-right rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><div class="grid gap-4"><input class="field" name="name" placeholder="Your Name" required /><input class="field" type="email" name="email" placeholder="Your Email" required /><textarea class="field min-h-32" name="message" placeholder="Your Message" required></textarea><button id="contactSubmitBtn" type="submit" class="hero-btn-primary w-full sm:w-auto">Send Message</button><p id="contactMsg" class="text-sm"></p></div></form></div></div></section>

    <footer class="mt-6 overflow-hidden rounded-t-[1.6rem] bg-[#0b1220] text-slate-200"><div class="grid gap-8 px-6 py-9 sm:px-8 lg:grid-cols-3 lg:px-10"><div><h3 class="text-2xl font-extrabold text-white">Rural Connect</h3><p class="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">Digital-first governance platform for transparent grievance resolution and stronger rural engagement.</p><div class="mt-4 flex items-center gap-3"><a href="#" class="footer-social">f</a><a href="#" class="footer-social">x</a><a href="#" class="footer-social">▶</a><a href="#" class="footer-social">in</a></div></div><div><h4 class="text-base font-bold text-white">Quick Links</h4><ul class="mt-4 space-y-2 text-sm text-slate-400"><li><a href="#home" class="footer-link">Home</a></li><li><a href="#about" class="footer-link">About</a></li><li><a href="#services" class="footer-link">Services</a></li><li><a href="#community" class="footer-link">Community</a></li><li><a href="#contact" class="footer-link">Contact</a></li></ul></div><div><h4 class="text-base font-bold text-white">Contact Info</h4><div class="mt-4 space-y-2 text-sm text-slate-400"><p>support@ruralconnect.in</p><p>+91 9876543210</p><p>District Office, Haryana, India</p></div></div></div><div class="border-t border-slate-800 px-6 py-3 text-xs text-slate-400 sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10"><p>© 2026 Rural Connect. All rights reserved.</p><p class="mt-2 sm:mt-0"><a href="#" class="footer-link">Privacy Policy</a><span class="px-2">|</span><a href="#" class="footer-link">Terms & Conditions</a></p></div></footer>
  `);
}

function registerPage() {
  return shell(`
    <section class="rise-in auth-shell auth-shell-register mx-auto max-w-6xl overflow-hidden glass-card">
      <div class="auth-grid auth-grid-register">
        <aside class="auth-aside">
          <span class="auth-badge">Trusted Onboarding</span>
          <h1 class="auth-title">Create Your Rural Connect Account</h1>
          <p class="auth-subtitle">Smart onboarding for citizens and officers with verified access to Rural Connect workflows.</p>
          <ul class="auth-points">
            <li><span class="auth-check">${authIcon("spark")}</span><span>Direct access to transparent grievance tracking</span></li>
            <li><span class="auth-check">${authIcon("shield")}</span><span>Verified identity with secure OTP authentication</span></li>
            <li><span class="auth-check">${authIcon("bolt")}</span><span>Faster routing from local level to district escalation</span></li>
          </ul>
          <div class="auth-chip-row">
            <span class="auth-chip auth-chip-a">${authIcon("star")} Guided onboarding</span>
            <span class="auth-chip auth-chip-b">${authIcon("role")} Multi-role ready</span>
            <span class="auth-chip auth-chip-c">${authIcon("shield")} End-to-end secure</span>
          </div>
          <div class="auth-glow-grid"><span></span><span></span><span></span></div>
        </aside>

        <div class="auth-main">
          <h2 class="auth-heading">Create Account</h2>
          <p class="auth-caption">Signup with role-based access and secure grievance verification</p>

          <form id="registerForm" class="mt-6 grid gap-4 sm:grid-cols-2">
            <label class="auth-label-block">
              <span class="auth-label">Full Name</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("user")}</span><input class="field" name="fullName" placeholder="Enter full name" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Age (18+)</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("age")}</span><input class="field" name="age" type="number" min="18" max="120" placeholder="Enter age" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Email</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("mail")}</span><input class="field" name="email" type="email" placeholder="name@example.com" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Phone</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("phone")}</span><input class="field" name="phone" pattern="[0-9]{10}" placeholder="10 digit mobile number" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Village</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("village")}</span><input class="field" name="village" placeholder="Village name" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">City / District</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("city")}</span><input class="field" name="city" placeholder="City or district" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Pincode</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("pin")}</span><input class="field" name="pincode" pattern="[0-9]{6}" placeholder="6 digit pincode" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Role</span>
              <div class="role-select" id="roleSelectControl">
                <button type="button" class="role-select-trigger" id="roleSelectTrigger" aria-haspopup="listbox" aria-expanded="false">
                  <span class="role-badge role-badge-placeholder" id="roleBadge"></span>
                  <span id="roleSelectText">Select Role</span>
                  <span class="select-caret">▾</span>
                </button>
                <div class="role-select-menu hidden" id="roleSelectMenu" role="listbox">
                  <button type="button" class="role-option role-option-citizen" data-role="CITIZEN" data-label="Citizen" role="option">
                    <span class="role-option-dot"></span>
                    <span class="role-option-text-wrap"><strong>Citizen</strong><small>Raise and track complaints</small></span>
                  </button>
                  <button type="button" class="role-option role-option-pradhan" data-role="PRADHAN" data-label="Pradhan" role="option">
                    <span class="role-option-dot"></span>
                    <span class="role-option-text-wrap"><strong>Pradhan</strong><small>Manage village complaint workflow</small></span>
                  </button>
                  <button type="button" class="role-option role-option-district" data-role="DISTRICT" data-label="District Officer" role="option">
                    <span class="role-option-dot"></span>
                    <span class="role-option-text-wrap"><strong>District Officer</strong><small>Handle escalations and closure</small></span>
                  </button>
                </div>
                <input type="hidden" name="role" id="roleSelect" value="" />
              </div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Password</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("lock")}</span><input class="field" name="password" id="registerPassword" type="password" minlength="6" placeholder="Create password" required /><button class="password-toggle" type="button" data-target="registerPassword" aria-label="Toggle password visibility">${eyeIcon(false)}</button></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Confirm Password</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("shield")}</span><input class="field" name="confirmPassword" id="registerConfirmPassword" type="password" minlength="6" placeholder="Re-enter password" required /><button class="password-toggle" type="button" data-target="registerConfirmPassword" aria-label="Toggle confirm password visibility">${eyeIcon(false)}</button></div>
            </label>

            <button class="btn-primary auth-submit sm:col-span-2" type="submit" id="registerBtn">Create Account</button>

            <div class="sm:col-span-2 flex flex-wrap gap-2">
              <span class="auth-tag auth-tag-a">${authIcon("spark")} Quick onboarding</span>
              <span class="auth-tag auth-tag-b">${authIcon("shield")} Secure credential flow</span>
              <span class="auth-tag auth-tag-c">${authIcon("bolt")} Priority verification</span>
            </div>

            <p id="registerMsg" class="sm:col-span-2 text-sm"></p>
            <p class="sm:col-span-2 text-sm text-slate-600">Already have an account? <a href="#/login" class="font-semibold text-[#2563EB] hover:underline">Login</a></p>
          </form>
        </div>
      </div>
    </section>
    ${authFooter()}
  `);
}

function verifyOtpPage() {
  const defaultEmail = sessionStorage.getItem(otpEmailStateKey) || "";
  return shell(`
    <section class="rise-in auth-shell mx-auto max-w-6xl overflow-hidden glass-card">
      <div class="auth-grid auth-grid-login">
        <aside class="auth-aside">
          <span class="auth-badge">OTP Verification</span>
          <h1 class="auth-title">Confirm Identity, Activate Access.</h1>
          <p class="auth-subtitle">Verify your email OTP to securely complete registration and start using Rural Connect services.</p>
          <ul class="auth-points">
            <li><span class="auth-check">${authIcon("shield")}</span><span>One-time secure verification for account activation</span></li>
            <li><span class="auth-check">${authIcon("mail")}</span><span>Email-based code delivery with protected session flow</span></li>
            <li><span class="auth-check">${authIcon("bolt")}</span><span>Fast onboarding to complaint tracking and dashboard</span></li>
          </ul>
          <div class="auth-chip-row">
            <span class="auth-chip auth-chip-a">${authIcon("spark")} Verified identity</span>
            <span class="auth-chip auth-chip-b">${authIcon("mail")} Email OTP secure</span>
            <span class="auth-chip auth-chip-c">${authIcon("role")} Role-ready account</span>
          </div>
          <div class="auth-glow-grid"><span></span><span></span><span></span></div>
        </aside>

        <div class="auth-main auth-main-login">
          <h2 class="auth-heading">Verify OTP</h2>
          <p class="auth-caption">Enter the verification code sent to your email address</p>

          <form id="otpForm" class="mt-8 space-y-5">
            <label class="auth-label-block">
              <span class="auth-label">Email Address</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("mail")}</span><input class="field" name="email" type="email" value="${defaultEmail}" placeholder="name@example.com" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">6-Digit OTP</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("shield")}</span><input class="field otp-code-input" name="otp" pattern="[0-9]{6}" maxlength="6" placeholder="000000" required /></div>
            </label>

            <button class="btn-primary auth-submit w-full" type="submit" id="otpBtn">Verify and Create Account</button>

            <div class="flex flex-wrap gap-2">
              <span class="auth-tag auth-tag-a">${authIcon("spark")} OTP protected activation</span>
              <span class="auth-tag auth-tag-b">${authIcon("shield")} Secure verification</span>
              <span class="auth-tag auth-tag-c">${authIcon("bolt")} Quick access setup</span>
            </div>

            <p id="otpMsg" class="text-sm"></p>
            <p class="text-sm text-slate-600">Wrong email? <a href="#/register" class="font-semibold text-[#2563EB] hover:underline">Go back to Register</a></p>
          </form>
        </div>
      </div>
    </section>
    ${authFooter()}
  `);
}

function loginPage() {
  return shell(`
    <section class="rise-in auth-shell mx-auto max-w-6xl overflow-hidden glass-card">
      <div class="auth-grid auth-grid-login">
        <aside class="auth-aside">
          <span class="auth-badge">Protected Access</span>
          <h1 class="auth-title">One Login, Total Rural Security.</h1>
          <p class="auth-subtitle">Securely access your Rural Connect dashboard and monitor every complaint stage in one place.</p>
          <ul class="auth-points">
            <li><span class="auth-check">${authIcon("role")}</span><span>Unified login for citizen and authority portals</span></li>
            <li><span class="auth-check">${authIcon("shield")}</span><span>Protected sessions with verified access controls</span></li>
            <li><span class="auth-check">${authIcon("bolt")}</span><span>Fast handoff to tracking, escalation and updates</span></li>
          </ul>
          <div class="auth-chip-row">
            <span class="auth-chip auth-chip-a">${authIcon("spark")} Secure Login</span>
            <span class="auth-chip auth-chip-b">${authIcon("shield")} OTP + Session</span>
            <span class="auth-chip auth-chip-c">${authIcon("role")} Role smart routing</span>
          </div>
          <div class="auth-glow-grid"><span></span><span></span><span></span></div>
        </aside>

        <div class="auth-main auth-main-login">
          <h2 class="auth-heading">Welcome Back</h2>
          <p class="auth-caption">Sign in to your secure Rural Connect workspace</p>

          <form id="loginForm" class="mt-8 space-y-5">
            <label class="auth-label-block">
              <span class="auth-label">Email Address</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("mail")}</span><input class="field" name="email" type="email" placeholder="name@example.com" required /></div>
            </label>

            <label class="auth-label-block">
              <span class="auth-label">Password</span>
              <div class="field-wrap"><span class="field-icon">${authIcon("lock")}</span><input class="field" name="password" id="loginPassword" type="password" placeholder="Enter your password" required /><button class="password-toggle" type="button" data-target="loginPassword" aria-label="Toggle password visibility">${eyeIcon(false)}</button></div>
            </label>

            <button class="btn-primary auth-submit w-full" type="submit" id="loginBtn">Login Securely</button>

            <div class="flex flex-wrap gap-2">
              <span class="auth-tag auth-tag-a">${authIcon("bolt")} Fast secure login</span>
              <span class="auth-tag auth-tag-b">${authIcon("shield")} Encrypted auth flow</span>
              <span class="auth-tag auth-tag-c">${authIcon("spark")} OTP guarded access</span>
            </div>

            <p id="loginMsg" class="text-sm"></p>
            <p class="text-sm text-slate-600">Don't have an account? <a href="#/register" class="font-semibold text-[#2563EB] hover:underline">Create One</a></p>
          </form>
        </div>
      </div>
    </section>
    ${authFooter()}
  `);
}

function dashboardPage() {
  return shell(`
    <section class="rise-in mx-auto max-w-5xl">
      <div class="glass-card p-6 sm:p-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-orange-700">AUTHENTICATED SESSION</p>
            <h1 class="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Dashboard Access Granted</h1>
            <p class="mt-2 text-sm text-slate-600 sm:text-base">You are successfully logged in. Continue to manage and track grievance workflows.</p>
          </div>
          <button id="logoutBtn" class="btn-primary">Logout</button>
        </div>

        <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article class="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">Overview</p>
            <p class="mt-2 text-sm text-slate-700">Monitor complaints, status timelines, and role-based actions in one place.</p>
          </article>
          <article class="rounded-2xl border border-orange-100 bg-orange-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-orange-700">Action Center</p>
            <p class="mt-2 text-sm text-slate-700">Review pending cases and escalate unresolved issues with proper accountability.</p>
          </article>
          <article class="rounded-2xl border border-teal-100 bg-teal-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.08em] text-teal-700">Verification</p>
            <p class="mt-2 text-sm text-slate-700">Secure records and verified identity flow keep complaint data trustworthy.</p>
          </article>
        </div>
      </div>
    </section>
    ${authFooter()}
  `);
}

function notFoundPage() {
  return shell(`
    <section class="rise-in mx-auto max-w-2xl glass-card p-8 text-center">
      <h1 class="text-4xl font-extrabold text-slate-900">404</h1>
      <p class="mt-2 text-slate-600">Page not found. Use navigation to continue.</p>
      <a class="btn-primary mt-6" href="#/">Back to Home</a>
    </section>
  `);
}

function closeMobileMenu() {
  const overlay = document.querySelector("#mobileMenuOverlay");
  const panel = document.querySelector("#mobileMenuPanel");
  if (!overlay || !panel) return;
  panel.classList.add("translate-x-full");
  overlay.classList.add("opacity-0");
  setTimeout(() => overlay.classList.add("hidden"), 250);
}

function openMobileMenu() {
  const overlay = document.querySelector("#mobileMenuOverlay");
  const panel = document.querySelector("#mobileMenuPanel");
  if (!overlay || !panel) return;
  overlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    panel.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0");
  });
}

function bindMobileMenu() {
  const openBtn = document.querySelector("#menuOpenBtn");
  const closeBtn = document.querySelector("#menuCloseBtn");
  const overlay = document.querySelector("#mobileMenuOverlay");
  if (!openBtn || !closeBtn || !overlay) return;
  openBtn.addEventListener("click", openMobileMenu);
  closeBtn.addEventListener("click", closeMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);
}

function scrollToSection(sectionId) {
  const target = document.querySelector(`#${sectionId}`);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindSectionNavigation(routeKey) {
  document.querySelectorAll("[data-section-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute("data-section-link");
      closeMobileMenu();
      if (routeKey !== "home") {
        sessionStorage.setItem(pendingSectionKey, sectionId);
        window.location.hash = "#/";
        return;
      }
      scrollToSection(sectionId);
    });
  });
}

function bindNavbarScrollEffect() {
  const navbar = document.querySelector("#rcNavbar");
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle("nav-scrolled", window.scrollY > 14);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function bindActiveSection(routeKey) {
  if (routeKey !== "home") return;
  const sections = [...document.querySelectorAll("section[id]")];
  const links = [...document.querySelectorAll("[data-section-link]")];
  if (!sections.length || !links.length) return;
  const setActive = (id) => links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("data-section-link") === id));
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { threshold: [0.3, 0.5, 0.8], rootMargin: "-30% 0px -50% 0px" });
  sections.forEach((section) => observer.observe(section));
  setActive("home");
}

function bindRevealAnimations() {
  const revealItems = [...document.querySelectorAll(".reveal")];
  if (!revealItems.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -12% 0px" });
  revealItems.forEach((item) => observer.observe(item));
}

function bindImpactCounters(routeKey) {
  if (routeKey !== "home") return;
  const counters = [...document.querySelectorAll("[data-counter]")];
  const impactSection = document.querySelector("#impact");
  if (!counters.length || !impactSection) return;
  let hasAnimated = false;
  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-target") || "0");
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1300;
    const start = performance.now();
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.some((entry) => entry.isIntersecting);
    if (!visible || hasAnimated) return;
    hasAnimated = true;
    counters.forEach((counter, idx) => setTimeout(() => animateCounter(counter), idx * 120));
    observer.disconnect();
  }, { threshold: 0.35 });
  observer.observe(impactSection);
}

function initHeroCarousel(routeKey) {
  if (routeKey !== "home") return;
  const container = document.querySelector(".hero-swiper");
  if (!container) return;
  if (heroSwiper) {
    heroSwiper.destroy(true, true);
    heroSwiper = undefined;
  }
  heroSwiper = new Swiper(container, {
    modules: [Autoplay, EffectFade, Navigation, Pagination],
    loop: true,
    speed: 850,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: { delay: 2000, disableOnInteraction: false },
    pagination: { el: ".hero-swiper-pagination", clickable: true },
    navigation: { nextEl: ".hero-swiper-next", prevEl: ".hero-swiper-prev" },
  });
  const animateActiveSlide = () => {
    document.querySelectorAll(".hero-slide-content").forEach((c) => c.classList.remove("is-visible"));
    container.querySelectorAll(".swiper-slide-active .hero-slide-content").forEach((c) => c.classList.add("is-visible"));
  };
  heroSwiper.on("slideChangeTransitionStart", animateActiveSlide);
  animateActiveSlide();
}

function setMessage(selector, message, isError) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = message;
  el.className = `text-sm ${isError ? "text-rose-600" : "text-emerald-700"}`;
}

function bindRegister() {
  const form = document.querySelector("#registerForm");
  if (!form) return;
  const roleSelect = document.querySelector("#roleSelect");
  bindRoleDropdown(form);
  bindPasswordToggles(form);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.querySelector("#registerBtn");
    button.disabled = true;
    setMessage("#registerMsg", "Sending OTP...", false);
    try {
      const data = new FormData(form);
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
      const village = data.get("village");
      const city = data.get("city");
      if (password !== confirmPassword) {
        setMessage("#registerMsg", "Password and confirm password must match.", true);
        button.disabled = false;
        return;
      }
      if (!roleSelect?.value) {
        setMessage("#registerMsg", "Please select a role.", true);
        button.disabled = false;
        return;
      }
      const payload = {
        fullName: data.get("fullName"),
        age: Number(data.get("age")),
        email: data.get("email"),
        phone: data.get("phone"),
        address: `${village}, ${city}`,
        pincode: data.get("pincode"),
        password,
        role: roleSelect?.value || data.get("role"),
        villageName: village || null,
        districtName: city || null,
        officeId: null,
      };
      await registerUser(payload);
      sessionStorage.setItem(otpEmailStateKey, payload.email);
      setMessage("#registerMsg", "OTP sent successfully. Redirecting to verify page...", false);
      window.location.hash = "#/verify-otp";
    } catch (error) {
      setMessage("#registerMsg", getErrorMessage(error), true);
    } finally {
      button.disabled = false;
    }
  });
}

function bindRoleDropdown(scope) {
  const control = scope.querySelector("#roleSelectControl");
  const trigger = scope.querySelector("#roleSelectTrigger");
  const menu = scope.querySelector("#roleSelectMenu");
  const hiddenInput = scope.querySelector("#roleSelect");
  const text = scope.querySelector("#roleSelectText");
  const badge = scope.querySelector("#roleBadge");
  const options = [...scope.querySelectorAll(".role-option")];
  if (!control || !trigger || !menu || !hiddenInput || !text || !badge || !options.length) return;

  const closeMenu = () => {
    menu.classList.add("hidden");
    trigger.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menu.classList.remove("hidden");
    trigger.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const applyRole = (role, label) => {
    hiddenInput.value = role;
    text.textContent = label;
    trigger.classList.remove("is-placeholder", "role-citizen", "role-pradhan", "role-district");
    badge.classList.remove("role-badge-placeholder", "role-badge-citizen", "role-badge-pradhan", "role-badge-district");
    if (role === "CITIZEN") {
      trigger.classList.add("role-citizen");
      badge.classList.add("role-badge-citizen");
    } else if (role === "PRADHAN") {
      trigger.classList.add("role-pradhan");
      badge.classList.add("role-badge-pradhan");
    } else if (role === "DISTRICT") {
      trigger.classList.add("role-district");
      badge.classList.add("role-badge-district");
    }
  };

  trigger.classList.add("is-placeholder");
  trigger.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    if (isOpen) closeMenu();
    else openMenu();
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      applyRole(option.getAttribute("data-role"), option.getAttribute("data-label"));
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!control.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function bindPasswordToggles(scope) {
  if (!scope) return;
  const toggles = [...scope.querySelectorAll(".password-toggle")];
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const input = document.querySelector(`#${targetId}`);
      if (!input) return;
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      toggle.innerHTML = eyeIcon(isHidden);
    });
  });
}

function bindOtpVerify() {
  const form = document.querySelector("#otpForm");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.querySelector("#otpBtn");
    button.disabled = true;
    setMessage("#otpMsg", "Verifying OTP...", false);
    try {
      const data = new FormData(form);
      const response = await verifyOtp({ email: data.get("email"), otp: data.get("otp") });
      if (response?.token) {
        localStorage.setItem("rc_token", response.token);
        setMessage("#otpMsg", "OTP verified. Redirecting to dashboard...", false);
        setTimeout(() => {
          window.location.hash = "#/dashboard/home";
        }, 500);
      } else {
        setMessage("#otpMsg", "Account created successfully. Redirecting to login...", false);
        setTimeout(() => {
          window.location.hash = "#/login";
        }, 500);
      }
    } catch (error) {
      setMessage("#otpMsg", getErrorMessage(error), true);
    } finally {
      button.disabled = false;
    }
  });
}

function bindLogin() {
  const form = document.querySelector("#loginForm");
  if (!form) return;
  bindPasswordToggles(form);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.querySelector("#loginBtn");
    button.disabled = true;
    setMessage("#loginMsg", "Logging in...", false);
    try {
      const data = new FormData(form);
      const response = await loginUser({ email: data.get("email"), password: data.get("password") });
      if (response?.token) localStorage.setItem("rc_token", response.token);
      if (response?.token) {
        setAuthSession({
          token: response.token,
          userId: response.userId,
          role: response.role || "CITIZEN",
          email: data.get("email"),
          displayName: String(data.get("email") || "User").split("@")[0],
        });
      }
      setMessage("#loginMsg", "Login successful. Redirecting to dashboard...", false);
      setTimeout(() => {
        window.location.hash = "#/dashboard/home";
      }, 450);
    } catch (error) {
      setMessage("#loginMsg", getErrorMessage(error), true);
    } finally {
      button.disabled = false;
    }
  });
}

function bindDashboard() {
  const logoutBtn = document.querySelector("#logoutBtn");
  if (!logoutBtn) return;
  logoutBtn.addEventListener("click", () => {
    clearAuthSession();
    localStorage.removeItem("rc_token");
    window.location.hash = "#/login";
  });
}

function bindContactForm(routeKey) {
  if (routeKey !== "home") return;
  const form = document.querySelector("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitBtn = document.querySelector("#contactSubmitBtn");
    const msg = document.querySelector("#contactMsg");
    if (submitBtn) submitBtn.setAttribute("disabled", "true");
    if (msg) {
      msg.className = "text-sm text-emerald-700";
      msg.textContent = "Thank you. Our team will contact you soon.";
    }
    form.reset();
    setTimeout(() => { if (submitBtn) submitBtn.removeAttribute("disabled"); }, 800);
  });
}

function bindPageEvents(routeKey) {
  bindMobileMenu();
  bindSectionNavigation(routeKey);
  bindNavbarScrollEffect();
  bindActiveSection(routeKey);
  bindRevealAnimations();
  bindImpactCounters(routeKey);
  bindContactForm(routeKey);
  initHeroCarousel(routeKey);
  if (routeKey === "register") bindRegister();
  if (routeKey === "verify-otp") bindOtpVerify();
  if (routeKey === "login") bindLogin();
  if (routeKey === "dashboard") bindDashboard();
}

function render() {
  const route = (window.location.hash || "#/").replace("#/", "") || "/";
  let routeKey = route;
  let dashboardCtx = null;
  if (heroSwiper && route !== "/") {
    heroSwiper.destroy(true, true);
    heroSwiper = undefined;
  }
  if (route === "/") {
    app.innerHTML = homePage();
    routeKey = "home";
  } else if (route === "register") {
    app.innerHTML = registerPage();
  } else if (route === "verify-otp") {
    app.innerHTML = verifyOtpPage();
  } else if (route === "login") {
    app.innerHTML = loginPage();
  } else if (route === "dashboard" || route.startsWith("dashboard/")) {
    const token = localStorage.getItem("rc_token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }
    const session = getAuthSession();
    if (!session?.role) {
      window.location.hash = "#/login";
      return;
    }
    const segment = route.split("/")[1] || "home";
    dashboardCtx = renderDashboard(segment);
    app.innerHTML = dashboardCtx.html;
    routeKey = "dashboard";
  } else {
    app.innerHTML = notFoundPage();
  }
  bindPageEvents(routeKey);
  if (dashboardCtx) {
    bindDashboardEvents(dashboardCtx);
  }
  if (routeKey === "home") {
    const pending = sessionStorage.getItem(pendingSectionKey);
    if (pending) {
      sessionStorage.removeItem(pendingSectionKey);
      setTimeout(() => scrollToSection(pending), 40);
    }
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
