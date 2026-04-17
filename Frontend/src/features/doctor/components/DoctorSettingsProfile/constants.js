export function checkReqs(val) {
  return {
    length: val.length >= 8,
    mixed: /[a-z]/.test(val) && /[A-Z]/.test(val),
    number: /\d/.test(val),
  };
}

const DEFAULT_DOCTOR = {
  name: "Noha Salem",
  email: "noha.salem@pulsex.com",
  phone: "+20 1234567890",
  dateOfBirth: "1985-06-15",
  location: "Cairo, Egypt",
  yearsExperience: "10+",
  gender: "female",
  bio: "Dr. Noha Salem is a highly experienced cardiologist with over a decade of practice in cardiovascular medicine. She focuses on preventive care and patient education.",
  avatarUrl:
    "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
  settings: {
    emailNotifications: true,
    darkMode: false,
  },
  experiences: [
    {
      id: 1,
      type: "Work Experience",
      institution: "Cairo Heart Institute",
      title: "Senior Cardiologist",
      startDate: "2018",
      endDate: "Present",
      description:
        "Lead complex cardiovascular consultations, supervise treatment plans, and mentor junior doctors.",
    },
    {
      id: 2,
      type: "Education",
      institution: "Cairo University Faculty of Medicine",
      title: "Medical Degree & Specialization",
      startDate: "2008",
      endDate: "2014",
      description:
        "Completed medical degree and advanced specialization in cardiology and internal medicine.",
    },
  ],
};

export function getDoctorWithFallback(doctor) {
  return {
    ...DEFAULT_DOCTOR,
    ...(doctor || {}),
    settings: {
      ...DEFAULT_DOCTOR.settings,
      ...(doctor?.settings || {}),
    },
    experiences:
      Array.isArray(doctor?.experiences) && doctor.experiences.length > 0
        ? doctor.experiences
        : DEFAULT_DOCTOR.experiences,
  };
}

export function getInitialFormFromDoctor(doctor) {
  const normalizedDoctor = getDoctorWithFallback(doctor);
  const fullName = (normalizedDoctor?.name ?? "").trim();
  const [firstName = "", ...restName] = fullName.split(" ");

  return {
    firstName,
    lastName: restName.join(" "),
    email: normalizedDoctor?.email ?? "",
    phone: normalizedDoctor?.phone ?? "",
    dob: normalizedDoctor?.dateOfBirth ?? "",
    location: normalizedDoctor?.location ?? "",
    yearsExperience: normalizedDoctor?.yearsExperience ?? "",
    gender: normalizedDoctor?.gender ?? "",
  };
}

export function getInitialBioFromDoctor(doctor) {
  return getDoctorWithFallback(doctor).bio ?? "";
}

export function getInitialExperiencesFromDoctor(doctor) {
  const normalizedDoctor = getDoctorWithFallback(doctor);
  return normalizedDoctor.experiences.map((experience, index) => ({
    id: experience?.id ?? index + 1,
    type: experience?.type ?? "",
    institution: experience?.institution ?? "",
    title: experience?.title ?? "",
    startDate: experience?.startDate ?? "",
    endDate: experience?.endDate ?? "",
    description: experience?.description ?? "",
  }));
}
