# Patient Feature - Structure and Styling Guide

This folder contains the patient experience for PulseX. It follows a page + components structure, uses Tailwind classes, and relies on CSS variables to keep colors consistent without changing the UI layout, spacing, or typography.

## 1) Folder Structure

- components/
  - AllComments/ - UI blocks for story comments list and header.
  - Appointments/ - Appointment header, stats, tabs, and list UI.
  - Booking/ - Booking calendar, time slots, and sidebar summary.
  - DoctorList/ - Filters, cards, and stats for doctor listing.
  - DoctorProfile/ - Doctor about, stats, and profile sections.
  - HeartRisk/ - Heart risk assessment UI.
  - LifestyleSurvey/ - Survey question blocks and results UI.
  - Messages/ - Chat sidebar, list, header, input bar, and message layout.
  - NotFound/ - Patient not found page (button returns to patient dashboard).
  - PatientChatbot/ - Patient chatbot UI.
  - PatientDashboard/ - Patient dashboard widgets and layout.
  - PatientDoctorCard/ - Single doctor card UI (if used in a list).
  - PatientHeader/ - Patient header/toolbar.
  - PatientLayout/ - Patient shell layout (sidebar + content).
  - PatientMedicalRecords/ - Records UI blocks.
  - PatientNextStep/ - Next step banner used in lifestyle survey flow.
  - PatientPayment/ - Payment UI content (page renders this component).
  - PatientRatingModal/ - Rating modal used in messages flow.
  - PatientSettingsProfile/ - Settings UI blocks.
  - PatientSidebar/ - Sidebar navigation items.
  - PatientUploadCard/ - Upload card UI for records or documents.
  - PrescriptionDetail/ - Medication, lab, and clinical notes sections.
  - PrescriptionDetailModal/ - Modal UI for a prescription detail (if used).
  - Prescriptions/ - Stats and prescription card UI.
  - QRCode/ - QR code header and details sections.
  - Stories/ - Stories list header and grid UI.
  - StoryDetails/ - Story details header and content blocks.
  - UpdateHealth/ - Update health number fields and sections.
  - VideoCall/ - Full screen and floating call UI.
  - WriteStory/ - Title, categories, cover image, editor, and actions.

- pages/
  - AllComments/ - Patient story comments page.
  - PatientAppointments/ - Appointment page entry point.
  - PatientBooking/ - Booking page entry point.
  - PatientDashboard/ - Dashboard page entry point.
  - PatientDoctorList/ - Doctor list page entry point.
  - PatientDoctorProfile/ - Doctor profile page entry point.
  - PatientLifestyleSurvey/ - Lifestyle survey page entry point.
  - PatientMedicalRecords/ - Medical records page entry point.
  - PatientMessages/ - Messages page entry point.
  - PatientPayment/ - Payment page entry point.
  - PatientSettingsProfile/ - Settings profile page entry point.
  - PatientUpdateHealth/ - Update health page entry point.
  - PrescriptionDetail/ - Prescription detail page entry point.
  - Prescriptions/ - Prescriptions list page entry point.
  - QRCode/ - Emergency QR code page entry point.
  - Stories/ - Stories list page entry point.
  - StoryDetails/ - Story details page entry point.
  - VideoCall/ - Video call page entry point (if routed).
  - WriteStory/ - Write story page entry point.

- hooks/
  - usePatientData.js - Patient data hook for mocked or live data wiring.

## 2) Routing and Page Pattern

- Each page is a route entry in App.jsx and renders a semantic main container.
- Pages are code split via React.lazy + Suspense.
- The page renders a content component from components/ to keep logic and layout clean.

## 3) Semantic Structure Rules

- Use exactly one h1 per page.
- Structure pages with semantic tags:
  - header for titles and page intro
  - main for page container
  - section for grouped blocks
  - article for core content
  - aside for side panels (summary cards, help blocks)
  - footer for auxiliary notes

## 4) Responsiveness

- Mobile-first by default.
- Common patterns:
  - grid shifts from 1 column to 12 columns on lg
  - text sizes scale via sm/md/lg breakpoints
  - side panels move below content on small screens

## 5) Colors and CSS Variables

Global brand colors (from the main theme in src/index.css):

- --color-brand-main: #333CF5
- --color-brand-secnd: #0913C3
- --color-brand-dark: #070E92
- --color-black-main-text: #010218
- --color-success-light: #00C853
- --color-success-main: #13A956
- --color-success-dark: #00953A
- --color-error: #DC2626
- --color-gray-text-dim: #6B7280
- --color-gray-text-dim2: #757575
- --color-black-hover: #0102184D

Patient feature local CSS variables:

- Write Story (components/WriteStory/constants.js)
  - --ws-muted: #757575
  - --ws-danger: #E7000B
  - --ws-border: #E5E7EB
  - --ws-chip-lifestyle: #FFA940
  - --ws-chip-health: #2B7FFF
  - --ws-chip-challenges: #8B5CF6
  - --ws-chip-recovery: #10B981
  - --ws-editor-muted: #6A7282
  - --ws-editor-bg: #F6F7F8

- Payment (components/PatientPayment/PatientPayment.jsx)
  - --payment-ink: #0F172A
  - --payment-muted: #64748B
  - --payment-brand: #3B5BFE
  - --payment-brand-hover: #252CBF

- Lifestyle Survey (pages/PatientLifestyleSurvey/PatientLifestyleSurvey.jsx)
  - --survey-muted: rgba(1, 2, 24, 0.8)

- Messages (pages/PatientMessages/PatientMessages.jsx)
  - --msg-muted: #6B7280
  - --msg-muted-2: #4B5563
  - --msg-muted-3: #9CA3AF

- Stories / Story Details (pages/Stories/Stories.jsx, pages/StoryDetails/StoryDetails.jsx)
  - --story-muted: #757575

- QR Code (pages/QRCode/QRCode.jsx)
  - --qr-muted: #757575

- Prescriptions (pages/Prescriptions/Prescriptions.jsx)
  - --rx-muted: #4A5565

- Prescription Detail (pages/PrescriptionDetail/PrescriptionDetail.jsx)
  - --rx-muted: #4A5565
  - --rx-muted-2: #364153

- Doctor Profile (pages/PatientDoctorProfile/PatientDoctorProfile.jsx)
  - --doc-muted: #6B7280
  - --doc-muted-2: #4A5565

- Doctor List (pages/PatientDoctorList/PatientDoctorList.jsx)
  - --doc-list-muted: #757575
  - --doc-list-muted-2: #ACACAC
  - --doc-list-muted-3: #9CA3AF

- Booking (pages/PatientBooking/PatientBooking.jsx)
  - --book-muted: #010218B2
  - --book-muted-2: #757575B2
  - --book-muted-3: #9CA3AF

- Appointments (pages/PatientAppointments/PatientAppointments.jsx)
  - --appt-muted: #757575
  - --appt-muted-2: #757575B2

- Update Health (pages/PatientUpdateHealth/PatientUpdateHealth.jsx)
  - --uh-muted: #4A5565
  - --uh-muted-2: #6B7280
  - --uh-muted-3: #9CA3AF

- All Comments (pages/AllComments/AllComments.jsx)
  - --comments-muted: #757575

- Patient Next Step (components/PatientNextStep/PatientNextStep.jsx)
  - --nextstep-muted: #DBEAFE

Note: Some files also use linear gradients with CSS variable fallbacks (e.g., QRCode details).

## 6) Accessibility Notes

- Always include alt text for images.
- Use aria-label for icon-only buttons or decorative SVGs.
- Keep headings in logical order (h1 then h2, h3, etc.).

## 7) Performance Notes

- Pages are loaded with React.lazy and Suspense (code splitting).
- Heavy UI sections are split into components to keep renders focused.

## 8) How to Extend

- Add a new page in pages/ and a matching UI component in components/.
- Export CSS variables near the page for consistent colors.
- Keep design dimensions and spacing untouched unless requested.
