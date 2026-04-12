# UI/UX Design Specification (Premium Government-Grade)
Rural Connect – Centralized Rural Grievance Resolution System

STRICT IMPLEMENTATION INSTRUCTIONS:
- Build a clean, modern, premium UI inspired by Indian government platforms
- Maintain perfect spacing, alignment, and responsiveness
- Use reusable components
- Ensure mobile-first responsive design
- Use Tailwind CSS for styling

---

## 1. DESIGN PRINCIPLES

- Clean and minimal UI
- Card-based layout
- Proper whitespace (no clutter)
- Consistent typography
- Smooth animations and transitions
- Accessibility friendly (contrast, readable fonts)

---

## 2. COLOR SYSTEM

Primary Colors:
- Deep Blue: #0B3C5D
- Government Orange: #F59E0B

Secondary:
- Light Blue: #E6F0FA
- Soft Grey: #F5F7FA

Accent:
- Green (success): #22C55E
- Red (error): #EF4444

Gradient Example:
- background: linear-gradient(135deg, #0B3C5D, #1E90FF)

---

## 3. TYPOGRAPHY

Font Family:
- Primary: "Poppins", "Inter", sans-serif

Font Sizes:
- H1: 36px bold
- H2: 28px semi-bold
- H3: 22px
- Body: 14–16px

Rules:
- Use consistent spacing (line-height: 1.6)
- Avoid dense text

---

## 4. LAYOUT SYSTEM

- Max Width: 1200px
- Center aligned container
- Section padding: 80px top-bottom
- Grid: 12-column system

---

## 5. NAVBAR (PREMIUM)

### Features:
- Sticky top navbar
- Logo (left)
- Menu items (center)
- Language toggle + Login (right)

### Mobile:
- Hamburger menu
- Slide-in sidebar

### Style:
- White background / glassmorphism
- Shadow-sm
- Hover underline animation

---

## 6. HERO SECTION

- Full width banner
- Background gradient or image
- Heading + subheading
- CTA buttons (Register / Login)

### Add:
- Carousel (auto sliding)
- Smooth fade animation

---

## 7. CARD DESIGN SYSTEM

### Card Style:
- Border-radius: 16px
- Shadow: soft
- Padding: 20px
- Background: white

### Hover:
- transform: translateY(-5px)
- shadow increase
- slight scale

### Icon:
- Circular icon above card
- Colored background

---

## 8. SECTION TYPES

### 8.1 Quick Action Cards
- Raise Complaint
- Track Complaint
- Community

---

### 8.2 Initiatives Section
- Grid layout
- Logo cards
- Hover highlight

---

### 8.3 Impact Section
- Large cards
- Stats numbers
- Background colors

---

### 8.4 Stats Section

- Animated counters
- Icons + numbers
- Grid layout

---

## 9. ANIMATIONS

### Use:
- Fade-in (scroll)
- Slide-up
- Hover scale
- Smooth transitions (300ms)

Libraries:
- AOS (scroll animations)

---

## 10. GLASSMORPHISM

Apply on:
- Navbar
- Overlay cards

Style:
- background: rgba(255,255,255,0.1)
- backdrop-blur
- border: 1px solid rgba(255,255,255,0.2)

---

## 11. BUTTON DESIGN

Primary Button:
- Background: orange
- Text: white
- Rounded: full

Hover:
- darker shade
- scale effect

---

## 12. CAROUSEL

Use Swiper.js:

- Autoplay
- Dots navigation
- Smooth sliding
- Responsive

---

## 13. CHATBOT UI

- Floating button (bottom right)
- Expandable chat window
- Minimal clean UI

---

## 14. FOOTER (PREMIUM)

Sections:
- Quick Links
- Government Links
- Contact Info

Style:
- Dark background
- White text
- Grid layout

Bottom:
- Copyright
- Links (privacy, terms)

---

## 15. RESPONSIVENESS

Mobile-first design:

Breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px

Rules:
- Stack cards vertically on mobile
- Collapse navbar into hamburger
- Reduce font size

---

## 16. ICONS

Use:
- Heroicons
- Lucide Icons

---

## 17. SPACING RULES

- Section gap: 80px
- Card gap: 20px
- Internal padding: 16–24px

---

## 18. ACCESSIBILITY

- High contrast colors
- Readable font sizes
- Keyboard navigation support

---

## 19. PERFORMANCE

- Lazy load images
- Optimize assets
- Minimize JS

---

## 20. OUTPUT REQUIREMENT

The UI must:
- Look premium and modern
- Be fully responsive
- Have smooth animations
- Follow clean alignment
- Match government-grade design quality