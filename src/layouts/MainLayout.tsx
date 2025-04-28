/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiBell, FiLogOut } from "react-icons/fi";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import menuItems from "../data/menuItems";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { RxAvatar } from "react-icons/rx";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import Loading from "../components/ui/Loading/Loading";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: getMeResponse,
    isLoading: isGetMeLoading,
    isFetching: isGetMeFetching,
  } = useGetMeQuery(undefined);

  const userData = getMeResponse?.data || null;

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;

    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          title: "Success!",
          text: "Sign out successful.",
          icon: "success",
        });
        navigate("/");
      }
    });
  };

  if (isGetMeLoading || isGetMeFetching) {
    return <Loading />;
  }

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-slate-800 text-black dark:text-white transition-colors duration-200`}
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
        <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-800">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link to={"/"} className="w-full">
              <img
                src={logo}
                alt="logo"
                className="h-16 w-full object-cover cursor-pointer"
              />
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? "bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-200"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex items-center text-sm rounded-full focus:outline-none text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                <RxAvatar size={35} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {userData?.name}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {userData?.role}
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
        } lg:hidden transition-transform duration-200 ease-in-out bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          {/* <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            FreelanceFlow
          </h1> */}
          {/* logo */}
          <Link to={"/"} className="w-full">
            <img
              src={logo}
              alt="logo"
              className="h-16 w-full object-cover cursor-pointer"
            />
          </Link>
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
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                      isActive
                        ? "bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-800">
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
            {/* Profile dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <RxAvatar size={35} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-800">
          <div className="p-5 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
