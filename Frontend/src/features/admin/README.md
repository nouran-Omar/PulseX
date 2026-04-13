# PulseX Admin Module 🛡️

Welcome to the **Admin module** of PulseX.
This folder is designed using a clear **feature-first structure** to keep development fast, scalable, and team-friendly.

## ✨ Overview

The Admin module provides a complete control panel experience for platform operations, including:

- Dashboard insights
- Doctor management
- Patient management
- Stories moderation
- Reports review
- Activity logs tracking
- Settings & profile management

It is built to separate **page orchestration** from **UI composition**, making each area easy to maintain and extend.

---

## 🗂️ Folder Structure

```text
admin/
├─ components/
│  ├─ ActivityLogs/
│  ├─ AdminDashboard/
│  ├─ AdminHeader/
│  ├─ AdminLayout/
│  ├─ ConfirmModal/
│  ├─ Container/
│  ├─ Doctor/
│  │  ├─ AddDoctorBtn/
│  │  ├─ DataTable/
│  │  ├─ DoctorManagement/
│  │  ├─ EditDoctor/
│  │  └─ EditForm/
│  ├─ DoctorForm/
│  ├─ EmptyState.jsx/
│  ├─ NotFound/
│  ├─ PatientForm/
│  ├─ Patients/
│  │  ├─ AddPatientBtn/
│  │  ├─ EditPatient/
│  │  └─ PatientManagement/
│  ├─ Reports/
│  ├─ SettingsProfile/
│  │  └─ Profile/
│  ├─ Sidebar/
│  ├─ SuccessPopup/
│  ├─ ToastNotification/
│  └─ shared/
│
└─ pages/
   ├─ ActivityLogs/
   ├─ Dashboard/
   ├─ Doctors/
   ├─ Patients/
   ├─ Reports/
   ├─ SettingsProfile/
   └─ Stories/
```

---

## 🧭 Architecture Style

The module follows a practical layered pattern:

- **pages/**
  Handles route-level composition, SEO setup, and page entry points.

- **components/**
  Contains reusable visual building blocks and feature-level UI sections.

- **shared/**
  Keeps reusable primitives (toggles, states, utility UI) used across admin screens.

This structure allows teams to work in parallel with minimal coupling and strong code discoverability.

---

## 🔄 Admin Flow (High-Level)

1. User enters `/admin` routes.
2. `AdminLayout` provides shell structure:
   - Sidebar navigation
   - Top header
   - Outlet for active page
3. Selected route loads its page module from `pages/`.
4. Page composes feature views from `components/`.
5. User actions (create/edit/delete/filter/export) are handled inside dedicated feature components.

---

## 🧩 Core Admin Sections

- **Dashboard**
  Quick metrics and operational overview.

- **Doctor Management**
  Listing, filtering, editing, exporting, and doctor CRUD actions.

- **Patient Management**
  Full patient listing workflow with table actions and management tools.

- **Stories Management**
  Moderation workflow with status handling, filtering, and review actions.

- **Reports**
  Structured report cards and moderation decisions.

- **Activity Logs**
  Timeline-style tracking of administrative activity.

- **Settings & Profile**
  Personal information updates, account preferences, and password flow.

---

## 🚀 How To Extend

When adding a new admin feature:

1. Create route-level page inside `pages/<Feature>/`.
2. Build UI and feature units inside `components/<Feature>/`.
3. Keep reusable UI in `components/shared/`.
4. Keep naming aligned with existing patterns for consistency.

Recommended naming:

- Page entry: `FeatureName.jsx`
- View component: `FeatureNameView.jsx`
- Shared building block: concise, role-specific names

---

## ✅ Team Conventions

- Keep components focused and composable.
- Prefer clear domain folders over flat large directories.
- Reuse shared UI units before creating new variants.
- Keep route modules lightweight and descriptive.
- Maintain readable semantic structure and accessible markup.

---

## 📌 Summary

The Admin module is organized for **clarity, scale, and speed**.
Its structure supports smooth onboarding, parallel team work, and rapid feature delivery while keeping the codebase clean and easy to navigate. 💙
