import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import WithAuth from "../role-wrappers/WithAuth";
import DashboardRootPage from "../pages/user/DashboardRootPage/DashboardRootPage";
// import NotFoundPage from "../pages/common/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";
import ClientManagementPage from "../pages/user/ClientManagementPage/ClientManagementPage";
import ProjectManagementPage from "../pages/user/ProjectManagementPage/ProjectManagementPage";
import InteractionManagementPage from "../pages/user/InteractionManagementPage/InteractionManagementPage";
import ReminderManagementPage from "../pages/user/ReminderManagementPage/ReminderManagementPage";

const router = createBrowserRouter([
  // freelancer dashboard
  {
    path: "/",
    element: (
      <WithAuth>
        <MainLayout />
      </WithAuth>
    ),

    // errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardRootPage />,
      },
      {
        path: "/clients",
        element: <ClientManagementPage />,
      },
      {
        path: "/projects",
        element: <ProjectManagementPage />,
      },
      {
        path: "/interactions",
        element: <InteractionManagementPage />,
      },
      {
        path: "/reminders",
        element: <ReminderManagementPage />,
      },
    ],
  },

  // auth
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
