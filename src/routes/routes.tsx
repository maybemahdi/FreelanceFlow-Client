import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import WithAuth from "../role-wrappers/WithAuth";
import DashboardRootPage from "../pages/user/DashboardRootPage/DashboardRootPage";
import NotFoundPage from "../pages/common/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";

const router = createBrowserRouter([
  //freelancer dashboard
  {
    path: "/",
    element: (
      <WithAuth>
        <MainLayout />
      </WithAuth>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardRootPage />,
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
