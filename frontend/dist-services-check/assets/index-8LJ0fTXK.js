import{a as e,i as t,n,o as r,r as i,t as a}from"./vendor-CycBfz5f.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var o=r.create({baseURL:`https://api.ruralconnect.gov.in`,timeout:15e3});o.interceptors.request.use(e=>{let t=localStorage.getItem(`rc_token`);return t&&(e.headers.Authorization=`Bearer ${t}`),e});var s=e=>e?.response?.data?.message||e?.response?.data?.error||e?.message||`Something went wrong`,c=async e=>{let{data:t}=await o.post(`/api/v1/auth/register`,e);return t},l=async e=>{let{data:t}=await o.post(`/api/v1/auth/verify-otp`,e);return t},u=async e=>{let{data:t}=await o.post(`/api/v1/auth/login`,e);return t},d=document.querySelector(`#app`),f=`rc_otp_email`,p=`rc_pending_section`,m,h=[{image:`/images/rural/rural-family.png`,heading:`Empowering Rural Voices`,subheading:`A digital platform connecting citizens with authorities for faster grievance resolution.`},{image:`/images/rural/digital-plan.png`,heading:`Digital Governance for Villages`,subheading:`Bringing transparency, accountability, and efficiency to rural administration.`},{image:`/images/rural/sustainable-developemnt.png`,heading:`Supporting Rural Development`,subheading:`Address issues related to water, roads, farming, and essential services.`},{image:`/images/rural/digital-classroom.png`,heading:`Building Better Futures`,subheading:`Improving quality of life through timely resolution of public issues.`}],g=[{title:`Water Supply`,description:`Issues related to water taps, pipelines, and availability`,image:`/images/rural/water-tap.png`},{title:`Street Lighting`,description:`Faulty or missing street lights in villages`,image:`/images/rural/street-light.png`},{title:`Road Infrastructure`,description:`Damaged roads, potholes, and construction issues`,image:`/images/rural/rural-road.png`},{title:`Sewage & Sanitation`,description:`Drainage problems and sanitation concerns`,image:`/images/rural/water-canal.png`},{title:`Government Schemes`,description:`Issues related to ration cards, Awaas Yojna, etc.`,image:`/images/rural/rural-healthcare.png`},{title:`Other Issues`,description:`Any other local grievances raised by citizens`,image:`/images/rural/school-children.png`}],_=[{title:`Raise Complaint`,description:`Citizen submits issue with details and media proof.`,icon:`file-text`},{title:`Pradhan Review`,description:`Local authority reviews and takes action.`,icon:`users`},{title:`Verification & Resolution`,description:`Issue is inspected and resolved within timeline.`,icon:`check-circle`},{title:`Escalation (If Needed)`,description:`If unresolved, it automatically escalates to district level.`,icon:`alert-triangle`}],v=[{label:`Complaints Resolved`,value:1e4,suffix:`+`,description:`Successfully resolved issues across villages`,icon:`analytics`},{label:`Active Users`,value:5e3,suffix:`+`,description:`Citizens actively using the platform`,icon:`users`},{label:`Villages Connected`,value:200,suffix:`+`,description:`Rural areas benefiting from digital governance`,icon:`home`},{label:`Avg Resolution Time`,value:5,suffix:` Days`,prefix:`3-`,description:`Faster response and resolution`,icon:`clock`}];function y(e){let t={analytics:`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M7 15l4-4 3 3 5-6"></path></svg>`,"file-text":`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>`,clock:`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,home:`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-6h6v6"></path></svg>`,users:`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,"check-circle":`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg>`,"alert-triangle":`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,"message-circle":`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3v-6.5A8.5 8.5 0 1 1 21 11.5z"></path></svg>`};return t[e]||t[`file-text`]}function b(e){return y(e)}var x=[{id:`home`,label:`Home`},{id:`about`,label:`About`},{id:`services`,label:`Services`},{id:`community`,label:`Community`},{id:`contact`,label:`Contact`}];function S(){return`
    <header id="rcNavbar" class="rc-navbar fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mt-3 flex h-[76px] items-center justify-between rounded-2xl border border-white/50 bg-white/65 px-4 shadow-[0_10px_38px_-20px_rgba(37,99,235,0.45)] backdrop-blur-xl transition-all duration-300 sm:px-5 lg:h-[84px] lg:px-6">
          <a href="#/" class="logo-glow group flex items-center gap-3 transition duration-300 hover:scale-[1.03]">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#F97316] text-base font-extrabold text-white">RC</span>
            <span class="text-xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text">Rural Connect</span>
          </a>

          <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary Navigation">
            ${x.map(e=>`<a href="#${e.id}" data-section-link="${e.id}" class="nav-link">${e.label}</a>`).join(``)}
          </nav>

          <div class="hidden items-center gap-3 md:flex">
            <button id="langToggle" class="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB]" aria-label="Toggle language">EN | हिंदी</button>
            <a href="#/login" class="rounded-full border border-[#2563EB] px-4 py-2 text-sm font-semibold text-[#2563EB] transition hover:scale-105 hover:bg-blue-50 hover:shadow-sm">Login</a>
            <a href="#/register" class="rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-orange-500 hover:shadow-[0_8px_24px_-10px_rgba(249,115,22,0.65)]">Register</a>
          </div>

          <button id="menuOpenBtn" class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/85 text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB] md:hidden" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileMenuPanel">
            <span class="text-xl leading-none">≡</span>
          </button>
        </div>
      </div>
    </header>

    <div id="mobileMenuOverlay" class="fixed inset-0 z-[60] hidden bg-slate-900/45 opacity-0 transition-opacity duration-300"></div>
    <aside id="mobileMenuPanel" class="fixed right-0 top-0 z-[70] h-full w-[84%] max-w-sm translate-x-full border-l border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300" aria-label="Mobile Navigation">
      <div class="flex items-center justify-between">
        <span class="text-lg font-extrabold text-transparent bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text">Rural Connect</span>
        <button id="menuCloseBtn" class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700" aria-label="Close navigation menu">✕</button>
      </div>

      <nav class="mt-8 flex flex-col gap-2" aria-label="Mobile Menu">
        ${x.map(e=>`<a href="#${e.id}" data-section-link="${e.id}" class="nav-link rounded-xl px-3 py-2 text-base">${e.label}</a>`).join(``)}
        <a href="#/login" class="mt-2 rounded-xl border border-[#2563EB] px-4 py-3 text-center text-sm font-semibold text-[#2563EB]">Login</a>
        <a href="#/register" class="rounded-xl bg-[#F97316] px-4 py-3 text-center text-sm font-semibold text-white">Register</a>
      </nav>
    </aside>
  `}function C(e){return`
    ${S()}
    <div class="mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      ${e}
    </div>
  `}function w(){return C(`
    <section id="home" class="scroll-mt-32">
      <div class="hero-swiper swiper rise-in relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8 lg:rounded-[2rem]">
        <div class="swiper-wrapper">
          ${h.map(e=>`
            <article class="swiper-slide relative h-[90vh] min-h-[540px]">
              <img src="${e.image}" alt="${e.heading}" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent"></div>
              <div class="absolute inset-0 flex items-end md:items-center">
                <div class="hero-slide-content mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-16 text-center sm:px-7 md:items-start md:pb-0 md:text-left lg:px-12">
                  <span class="mb-4 inline-flex rounded-full border border-white/35 bg-white/15 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white backdrop-blur">RURAL CONNECT PLATFORM</span>
                  <h1 class="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">${e.heading}</h1>
                  <p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-100 sm:text-lg">${e.subheading}</p>
                  <div class="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row md:justify-start">
                    <a href="#/register" class="hero-btn-primary">Raise Complaint</a>
                    <a href="#/verify-otp" class="hero-btn-secondary">Track Complaint</a>
                  </div>
                </div>
              </div>
            </article>
          `).join(``)}
        </div>

        <button class="hero-swiper-prev absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/20 text-white backdrop-blur transition hover:scale-105 hover:bg-black/35 md:grid" aria-label="Previous Slide">❮</button>
        <button class="hero-swiper-next absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/20 text-white backdrop-blur transition hover:scale-105 hover:bg-black/35 md:grid" aria-label="Next Slide">❯</button>

        <div class="hero-swiper-pagination absolute bottom-7 left-0 right-0 z-20"></div>
      </div>
    </section>

    <section id="about" class="mt-8 scroll-mt-32">
      <div class="glass-card overflow-hidden p-5 sm:p-7 lg:p-9">
        <div class="grid items-center gap-7 lg:grid-cols-[1fr_1.08fr] lg:gap-10">
          <div class="reveal reveal-left">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <figure class="about-image-wrap group relative overflow-hidden rounded-2xl">
                <img src="/images/rural/about-egovernance.png" alt="Digital e-governance" class="about-image" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </figure>
              <figure class="about-image-wrap group relative overflow-hidden rounded-2xl">
                <img src="/images/rural/about-digital-dashboard.png" alt="Smart dashboard and analytics" class="about-image" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </figure>
            </div>
          </div>

          <article class="reveal reveal-right">
            <p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">About Rural Connect</p>
            <h2 class="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Transforming Rural Governance Through Digital Innovation</h2>
            <p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Rural Connect is a centralized digital platform designed to bridge the gap between rural citizens and local authorities.
            </p>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              In many villages, people struggle to get their basic issues resolved due to delays, lack of transparency, and inefficient communication.
            </p>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Our platform empowers citizens to raise complaints, track progress in real-time, and ensure accountability at every level — from village leadership to district authorities.
            </p>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              By leveraging technology, Rural Connect brings transparency, faster resolution, and better governance to rural communities.
            </p>

            <div class="mt-6 grid gap-2 sm:grid-cols-2">
              <div class="feature-chip"><span class="feature-icon">◉</span><span>Transparent complaint tracking system</span></div>
              <div class="feature-chip"><span class="feature-icon">⚡</span><span>Faster issue resolution with defined timelines</span></div>
              <div class="feature-chip"><span class="feature-icon">✉</span><span>Direct communication with authorities</span></div>
              <div class="feature-chip"><span class="feature-icon">⇧</span><span>Automatic escalation for unresolved issues</span></div>
              <div class="feature-chip sm:col-span-2"><span class="feature-icon">👥</span><span>Community-driven problem reporting</span></div>
            </div>

            <div class="mt-7">
              <a href="#/register" class="hero-btn-primary">Raise Your First Complaint</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="services" class="mt-8 scroll-mt-32">
      <header class="reveal text-center">
        <p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">Services</p>
        <h2 class="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Addressing Key Rural Issues Efficiently</h2>
        <p class="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">Rural Connect enables citizens to report and resolve essential public service issues quickly and transparently.</p>
      </header>

      <div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        ${g.map((e,t)=>`
          <article class="service-card reveal group relative overflow-hidden rounded-2xl" style="transition-delay:${Math.min(t*70,280)}ms;">
            <img src="${e.image}" alt="${e.title}" class="service-media h-[290px] w-full object-cover" />
            <div class="service-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 z-10 p-5">
              <h3 class="text-xl font-bold text-white">${e.title}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-100">${e.description}</p>
            </div>
          </article>
        `).join(``)}
      </div>
    </section>

    <section id="how-it-works" class="mt-10 scroll-mt-32">
      <header class="reveal text-center">
        <p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">How It Works</p>
        <h2 class="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Simple Process. Transparent Governance.</h2>
        <p class="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">From complaint submission to resolution, every step is transparent and trackable.</p>
      </header>

      <div class="timeline-wrap relative mt-8">
        <div class="timeline-line absolute left-5 top-0 h-full w-px bg-gradient-to-b from-blue-300 via-blue-200 to-orange-200 md:left-1/2 md:-translate-x-1/2"></div>
        <div class="space-y-5 md:space-y-7">
          ${_.map((e,t)=>{let n=t%2==0;return`
                <div class="timeline-row reveal relative grid md:grid-cols-12 md:items-center" style="transition-delay:${Math.min(t*120,360)}ms;">
                  <div class="${n?`md:col-span-5 md:col-start-1 md:pr-10`:`md:col-span-5 md:col-start-8 md:pl-10`} pl-12 md:pl-0">
                    <article class="timeline-card rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_16px_38px_-24px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6">
                      <div class="timeline-card-icon">${b(e.icon)}</div>
                      <h3 class="mt-4 text-xl font-bold text-slate-900">${e.title}</h3>
                      <p class="mt-2 text-sm leading-relaxed text-slate-600">${e.description}</p>
                    </article>
                  </div>
                  <div class="timeline-node absolute left-5 top-8 -translate-x-1/2 md:left-1/2">
                    <span>${t+1}</span>
                  </div>
                </div>
              `}).join(``)}
        </div>
      </div>
    </section>

    <section id="impact" class="mt-10 scroll-mt-32">
      <div class="glass-card p-6 sm:p-8 lg:p-10">
        <header class="reveal text-center">
          <p class="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#2563EB]">Our Impact</p>
          <h2 class="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">Driving Change Across Rural Communities</h2>
          <p class="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">Empowering villages with transparency, accountability, and faster grievance resolution.</p>
        </header>

        <div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          ${v.map((e,t)=>`
            <article class="impact-card reveal rounded-2xl border border-white/70 bg-white/85 p-6 text-center shadow-[0_16px_36px_-24px_rgba(15,23,42,0.45)] backdrop-blur" style="transition-delay:${Math.min(t*80,320)}ms;">
              <span class="impact-icon">${y(e.icon)}</span>
              <p class="mt-4 text-sm font-semibold uppercase tracking-[0.06em] text-slate-600">${e.label}</p>
              <p class="mt-2 text-3xl font-extrabold text-[#F97316] sm:text-4xl" data-counter data-target="${e.value}" data-prefix="${e.prefix||``}" data-suffix="${e.suffix||``}">0</p>
              <p class="mt-3 text-sm leading-relaxed text-slate-600">${e.description}</p>
            </article>
          `).join(``)}
        </div>
      </div>
    </section>

    <section id="community" class="rise-in mt-8 scroll-mt-32 glass-card p-7 sm:p-9">
      <h2 class="text-3xl font-extrabold text-slate-900">Community</h2>
      <p class="mt-3 max-w-3xl leading-relaxed text-slate-600">Create local groups, collaborate with members, and post service updates for your area in a trusted digital space.</p>
    </section>

    <section id="contact" class="rise-in mt-8 scroll-mt-32 glass-card p-7 sm:p-9">
      <h2 class="text-3xl font-extrabold text-slate-900">Contact</h2>
      <p class="mt-3 max-w-3xl leading-relaxed text-slate-600">Need assistance? Reach your local governance team through the integrated support channels in your dashboard once logged in.</p>
    </section>
  `)}function T(){return C(`
    <section class="rise-in mx-auto max-w-4xl glass-card p-6 sm:p-9">
      <h1 class="text-3xl font-extrabold text-slate-900">Create Account</h1>
      <p class="mt-1 text-sm text-slate-500">Pure HTML/CSS/JS form with Tailwind styling, connected to your backend.</p>
      <form id="registerForm" class="mt-6 grid gap-4 sm:grid-cols-2">
        <input class="field" name="fullName" placeholder="Full Name" required />
        <input class="field" name="age" type="number" min="18" max="120" value="18" required />
        <input class="field" name="email" type="email" placeholder="Email" required />
        <input class="field" name="phone" pattern="[0-9]{10}" placeholder="Phone (10 digits)" required />
        <textarea class="field sm:col-span-2" name="address" placeholder="Address" required></textarea>
        <input class="field" name="pincode" pattern="[0-9]{6}" placeholder="Pincode" required />
        <input class="field" name="password" type="password" minlength="6" placeholder="Password" required />

        <select class="field" name="role" id="roleSelect" required>
          <option value="CITIZEN">CITIZEN</option>
          <option value="PRADHAN">PRADHAN</option>
          <option value="DISTRICT">DISTRICT</option>
        </select>
        <input class="field" name="villageName" id="villageName" placeholder="Village Name (for PRADHAN)" />
        <input class="field" name="districtName" id="districtName" placeholder="District Name (for DISTRICT)" />
        <input class="field" name="officeId" id="officeId" placeholder="Office ID (optional)" />

        <button class="btn-primary sm:col-span-2" type="submit" id="registerBtn">Send OTP</button>
        <p id="registerMsg" class="sm:col-span-2 text-sm"></p>
      </form>
    </section>
  `)}function E(){return C(`
    <section class="rise-in mx-auto max-w-xl glass-card p-6 sm:p-9">
      <h1 class="text-3xl font-extrabold text-slate-900">Verify OTP</h1>
      <p class="mt-1 text-sm text-slate-500">Enter the OTP sent to your email.</p>
      <form id="otpForm" class="mt-6 space-y-4">
        <input class="field" name="email" type="email" value="${sessionStorage.getItem(f)||``}" placeholder="Email" required />
        <input class="field" name="otp" pattern="[0-9]{6}" maxlength="6" placeholder="6-digit OTP" required />
        <button class="btn-primary w-full" type="submit" id="otpBtn">Verify and Create Account</button>
        <p id="otpMsg" class="text-sm"></p>
      </form>
    </section>
  `)}function D(){return C(`
    <section class="rise-in mx-auto max-w-xl glass-card p-6 sm:p-9">
      <h1 class="text-3xl font-extrabold text-slate-900">Login</h1>
      <p class="mt-1 text-sm text-slate-500">Use your verified account credentials.</p>
      <form id="loginForm" class="mt-6 space-y-4">
        <input class="field" name="email" type="email" placeholder="Email" required />
        <input class="field" name="password" type="password" placeholder="Password" required />
        <button class="btn-primary w-full" type="submit" id="loginBtn">Login</button>
        <p id="loginMsg" class="text-sm"></p>
      </form>
    </section>
  `)}function O(){return C(`
    <section class="rise-in mx-auto max-w-2xl glass-card p-8 text-center">
      <h1 class="text-4xl font-extrabold text-slate-900">404</h1>
      <p class="mt-2 text-slate-600">Page not found. Use navigation to continue.</p>
      <a class="btn-primary mt-6" href="#/">Back to Home</a>
    </section>
  `)}function k(){let e=document.querySelector(`#mobileMenuOverlay`),t=document.querySelector(`#mobileMenuPanel`),n=document.querySelector(`#menuOpenBtn`);!e||!t||!n||(t.classList.add(`translate-x-full`),e.classList.add(`opacity-0`),n.setAttribute(`aria-expanded`,`false`),window.setTimeout(()=>{e.classList.add(`hidden`)},250))}function A(){let e=document.querySelector(`#mobileMenuOverlay`),t=document.querySelector(`#mobileMenuPanel`),n=document.querySelector(`#menuOpenBtn`);!e||!t||!n||(e.classList.remove(`hidden`),requestAnimationFrame(()=>{t.classList.remove(`translate-x-full`),e.classList.remove(`opacity-0`)}),n.setAttribute(`aria-expanded`,`true`))}function j(){let e=document.querySelector(`#menuOpenBtn`),t=document.querySelector(`#menuCloseBtn`),n=document.querySelector(`#mobileMenuOverlay`);!e||!t||!n||(e.addEventListener(`click`,A),t.addEventListener(`click`,k),n.addEventListener(`click`,k))}function M(e){let t=document.querySelector(`#${e}`);t&&t.scrollIntoView({behavior:`smooth`,block:`start`})}function N(e){document.querySelectorAll(`[data-section-link]`).forEach(t=>{t.addEventListener(`click`,n=>{n.preventDefault();let r=t.getAttribute(`data-section-link`);if(k(),e!==`home`){sessionStorage.setItem(p,r),window.location.hash=`#/`;return}M(r)})})}function P(){let e=document.querySelector(`#rcNavbar`);if(!e)return;let t=()=>{window.scrollY>14?e.classList.add(`nav-scrolled`):e.classList.remove(`nav-scrolled`)};window.addEventListener(`scroll`,t,{passive:!0}),t()}function F(e){if(e!==`home`)return;let t=[...document.querySelectorAll(`section[id]`)],n=[...document.querySelectorAll(`[data-section-link]`)];if(!t.length||!n.length)return;let r=e=>{n.forEach(t=>{t.classList.toggle(`is-active`,t.getAttribute(`data-section-link`)===e)})},i=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>t.intersectionRatio-e.intersectionRatio)[0];t?.target?.id&&r(t.target.id)},{threshold:[.3,.5,.8],rootMargin:`-30% 0px -50% 0px`});t.forEach(e=>i.observe(e)),r(`home`)}function I(){let e=[...document.querySelectorAll(`.reveal`)];if(!e.length)return;let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`is-visible`),t.unobserve(e.target))})},{threshold:.2,rootMargin:`0px 0px -12% 0px`});e.forEach(e=>t.observe(e))}function L(e){if(e!==`home`)return;let t=[...document.querySelectorAll(`[data-counter]`)];if(!t.length)return;let n=!1,r=document.querySelector(`#impact`);if(!r)return;let i=e=>{let t=Number(e.getAttribute(`data-target`)||`0`),n=e.getAttribute(`data-prefix`)||``,r=e.getAttribute(`data-suffix`)||``,i=performance.now(),a=o=>{let s=Math.min((o-i)/1300,1),c=1-(1-s)**3;e.textContent=`${n}${Math.floor(t*c).toLocaleString()}${r}`,s<1&&requestAnimationFrame(a)};requestAnimationFrame(a)},a=new IntersectionObserver(e=>{!e.some(e=>e.isIntersecting)||n||(n=!0,t.forEach((e,t)=>{setTimeout(()=>i(e),t*120)}),a.disconnect())},{threshold:.35});a.observe(r)}function R(r){if(r!==`home`)return;let o=document.querySelector(`.hero-swiper`);if(!o)return;m&&=(m.destroy(!0,!0),void 0),m=new e(o,{modules:[n,a,t,i],loop:!0,speed:850,effect:`fade`,fadeEffect:{crossFade:!0},autoplay:{delay:5e3,disableOnInteraction:!1},pagination:{el:`.hero-swiper-pagination`,clickable:!0},navigation:{nextEl:`.hero-swiper-next`,prevEl:`.hero-swiper-prev`}});let s=()=>{document.querySelectorAll(`.hero-slide-content`).forEach(e=>{e.classList.remove(`is-visible`)}),o.querySelectorAll(`.swiper-slide-active .hero-slide-content`).forEach(e=>e.classList.add(`is-visible`))};m.on(`slideChangeTransitionStart`,s),s()}function z(e,t,n){let r=document.querySelector(e);r&&(r.textContent=t,r.className=`text-sm ${n?`text-rose-600`:`text-emerald-700`}`)}function B(){let e=document.querySelector(`#registerForm`);if(!e)return;let t=document.querySelector(`#roleSelect`),n=document.querySelector(`#villageName`),r=document.querySelector(`#districtName`),i=()=>{let e=t.value;n.required=e===`PRADHAN`,r.required=e===`DISTRICT`};i(),t.addEventListener(`change`,i),e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.querySelector(`#registerBtn`);n.disabled=!0,z(`#registerMsg`,`Sending OTP...`,!1);try{let t=new FormData(e),n={fullName:t.get(`fullName`),age:Number(t.get(`age`)),email:t.get(`email`),phone:t.get(`phone`),address:t.get(`address`),pincode:t.get(`pincode`),password:t.get(`password`),role:t.get(`role`),villageName:t.get(`villageName`)||null,districtName:t.get(`districtName`)||null,officeId:t.get(`officeId`)||null};await c(n),sessionStorage.setItem(f,n.email),z(`#registerMsg`,`OTP sent successfully. Redirecting to verify page...`,!1),window.location.hash=`#/verify-otp`}catch(e){z(`#registerMsg`,s(e),!0)}finally{n.disabled=!1}})}function V(){let e=document.querySelector(`#otpForm`);e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.querySelector(`#otpBtn`);n.disabled=!0,z(`#otpMsg`,`Verifying OTP...`,!1);try{let t=new FormData(e);await l({email:t.get(`email`),otp:t.get(`otp`)}),z(`#otpMsg`,`Account created successfully. You can login now.`,!1),window.location.hash=`#/login`}catch(e){z(`#otpMsg`,s(e),!0)}finally{n.disabled=!1}})}function H(){let e=document.querySelector(`#loginForm`);e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.querySelector(`#loginBtn`);n.disabled=!0,z(`#loginMsg`,`Logging in...`,!1);try{let t=new FormData(e),n=await u({email:t.get(`email`),password:t.get(`password`)});n?.token&&localStorage.setItem(`rc_token`,n.token),z(`#loginMsg`,`Login successful.`,!1)}catch(e){z(`#loginMsg`,s(e),!0)}finally{n.disabled=!1}})}function U(e){j(),N(e),P(),F(e),R(e),I(),L(e),e===`register`&&B(),e===`verify-otp`&&V(),e===`login`&&H()}function W(){let e=(window.location.hash||`#/`).replace(`#/`,``)||`/`,t=e;if(m&&e!==`/`&&(m.destroy(!0,!0),m=void 0),e===`/`?(d.innerHTML=w(),t=`home`):e===`register`?d.innerHTML=T():e===`verify-otp`?d.innerHTML=E():e===`login`?d.innerHTML=D():d.innerHTML=O(),U(t),t===`home`){let e=sessionStorage.getItem(p);e&&(sessionStorage.removeItem(p),setTimeout(()=>M(e),40))}}window.addEventListener(`hashchange`,W),window.addEventListener(`DOMContentLoaded`,W);