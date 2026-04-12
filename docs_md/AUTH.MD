## 5. REGISTER FORM (Advanced Role-Based Registration)

STRICT IMPLEMENTATION INSTRUCTIONS:
- Build a structured, multi-field registration form
- Ensure clean layout, proper grouping, and validation
- Use responsive grid system
- Add role-based UI behavior

---

## 5.1 FORM LAYOUT

### Desktop:
- 2-column grid layout

### Mobile:
- Single column

---

## 5.2 INPUT FIELDS

### Section 1: Personal Information

- Full Name (text, required)
- Age (number, required, min: 18)
- Email (email, required, unique)
- Phone (number, required, unique)

---

### Section 2: Address Details

- Address (textarea, required)
- Pin Code (number, required, 6 digits)

---

### Section 3: Security

- Password (required, min 6 chars)
- Confirm Password (must match)

---

## 5.3 ROLE SELECTION (IMPORTANT UI)

### Layout:
- Card-based selection (3 cards)

Cards:
1. Citizen
2. Pradhan
3. District Officer

---

### Card Design:
- Border: light grey
- Padding: 16px
- Rounded: 12px
- Hover: highlight
- Selected: border + background change

---

### Role Descriptions:

Citizen:
"Raise and track complaints"

Pradhan:
"Manage and resolve village complaints"

District Officer:
"Monitor escalations and ensure accountability"

---

## 5.4 ROLE-BASED FIELD BEHAVIOR

### Citizen:
- No extra fields

---

### Pradhan:
- Add field:
  - Village Name (required)

---

### District Officer:
- Add fields:
  - District Name (required)
  - Office ID (optional)

---

## 5.5 VALIDATION RULES

- Email must be valid
- Phone must be 10 digits
- Pin Code must be 6 digits
- Password must match confirm password
- Role must be selected

---

## 5.6 UI BEHAVIOR

- Input focus → blue border
- Error → red border + message
- Success → green border

---

## 5.7 BUTTON

Primary CTA:
"Create Account"

### Style:
- Full width
- Gradient background
- Hover animation (scale + shadow)

---

## 5.8 OTP FLOW (MANDATORY)

After form submit:

Step 1:
- Generate OTP
- Send to email

Step 2:
- Show OTP input screen

Step 3:
- Verify OTP
- Create account

---

## 5.9 UX ENHANCEMENTS

- Show password toggle (eye icon)
- Real-time validation
- Disable button until valid

---

## 5.10 RESPONSIVENESS

- Stack fields on mobile
- Maintain spacing
- Touch-friendly inputs

---

## 5.11 OUTPUT REQUIREMENT

Registration form must:
- Be clean and structured
- Support role-based logic
- Validate all inputs
- Provide smooth user experience