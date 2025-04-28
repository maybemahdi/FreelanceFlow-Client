import { FiBell, FiBriefcase, FiHome, FiMail, FiUsers } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Clients", path: "/clients", icon: <FiUsers /> },
  { name: "Projects", path: "/projects", icon: <FiBriefcase /> },
  { name: "Interactions", path: "/interactions", icon: <FiMail /> },
  { name: "Reminders", path: "/reminders", icon: <FiBell /> },
  // { name: "Calendar", path: "/calendar", icon: <FiCalendar /> },
];
export default menuItems;
