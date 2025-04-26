/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiUser,
  FiHome,
  FiUsers,
  FiBriefcase,
  FiCalendar,
  FiMail,
  FiBell,
} from "react-icons/fi";
import { Outlet } from "react-router-dom";
import menuItems from "../data/menuItems";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }

    // Set current path for active nav item
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    // Apply theme class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}
    >
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              FreelanceFlow
            </h1>
          </div>
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                      currentPath === item.path
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  John Doe
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden transition-transform duration-200 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            FreelanceFlow
          </h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPath === item.path
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 mr-2 text-gray-500 rounded-md lg:hidden hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              {menuItems.find((item) => item.path === currentPath)?.name ||
                "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-1 text-gray-500 rounded-md hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              {darkMode ? (
                <FiSun className="w-6 h-6" />
              ) : (
                <FiMoon className="w-6 h-6" />
              )}
            </button>
            <button className="p-1 text-gray-500 rounded-md hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">
              <FiBell className="w-6 h-6" />
            </button>
            <div className="relative">
              <button className="flex items-center text-sm rounded-full focus:outline-none">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
