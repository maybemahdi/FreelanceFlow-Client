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
import CreateClientPage from "../pages/user/ClientManagementPage/AddNew/AddNew";
import UpdateClientPage from "../pages/user/ClientManagementPage/EditClient/EditClient";
import CreateProjectPage from "../pages/user/ProjectManagementPage/AddNew/CreateProject";
import UpdateProjectPage from "../pages/user/ProjectManagementPage/EditProject/EditProject";
import CreateInteractionPage from "../pages/user/InteractionManagementPage/Create/CreateInteraction";
import UpdateInteractionPage from "../pages/user/InteractionManagementPage/Update/UpdateInteraction";
import CreateReminderPage from "../pages/user/ReminderManagementPage/AddNew/CreateReminder";
import UpdateReminderPage from "../pages/user/ReminderManagementPage/Edit/UpdateReminder";

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
      {
        path: "/clients/new",
        element: <CreateClientPage />,
      },
      {
        path: "/clients/:clientId",
        element: <UpdateClientPage />,
      },
      {
        path: "/projects/new",
        element: <CreateProjectPage />,
      },
      {
        path: "/projects/:projectId",
        element: <UpdateProjectPage />,
      },
      {
        path: "/interactions/new",
        element: <CreateInteractionPage />,
      },
      {
        path: "/interactions/:interactionId",
        element: <UpdateInteractionPage />,
      },
      {
        path: "/reminders/new",
        element: <CreateReminderPage />,
      },
      {
        path: "/reminders/:reminderId",
        element: <UpdateReminderPage />,
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
