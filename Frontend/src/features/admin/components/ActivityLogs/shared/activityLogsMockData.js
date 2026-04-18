export const FILTERS = [
  "All",
  "Created",
  "Updated",
  "Deleted",
  "Login",
  "Logout",
];

export const ICON_STYLES = {
  plus: { bg: "bg-[#EFF6FF]", text: "text-[#155dfc]" },
  pencil: { bg: "bg-[#FFFBEB]", text: "text-[#D97706]" },
  login: { bg: "bg-[#F0FDF4]", text: "text-[#059669]" },
  logout: { bg: "bg-[#FDF4FF]", text: "text-[#9333EA]" },
  trash: { bg: "bg-[#FEF2F2]", text: "text-[#EF4444]" },
};

export const getMockActivityLogs = () =>
  Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    type: ["Created", "Updated", "Deleted", "Login", "Logout"][index % 5],
    title: [
      "Added new patient",
      "Doctor profile updated",
      "User login",
      "Appointment rescheduled",
      "New prescription created",
      "Appointment cancelled",
    ][index % 6],
    description: `This is a detailed description for system activity #${index + 1} regarding patient records and updates.`,
    time: index === 0 ? "2 minutes ago" : `${index + 1} hours ago`,
    iconType: ["plus", "pencil", "login", "pencil", "plus", "trash"][index % 6],
  }));
