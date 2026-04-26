import {
  createHashRouter,
  Navigate
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import OrdersPage from "../pages/OrdersPage";
import SuppliersPage from "../pages/SuppliersPage";
import ReportsPage from "../pages/ReportsPage";
import SettingsPage from "../pages/SettingsPage";
import MainLayout from "../layouts/MainLayout";

function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

function roleHome() {
  const user = getUser();

  if (!user) return "/login";
  if (user.role === "Admin") return "/";
  return "/orders";
}

function allowAdmin(element:any) {
  return getUser()?.role === "Admin"
    ? element
    : <Navigate to="/orders" replace />;
}

export const router = createHashRouter([
  {
    path: "/login",
    element: <LoginPage />
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element:
          getUser()?.role === "Admin"
            ? <DashboardPage />
            : <Navigate to="/orders" replace />
      },

      {
        path: "orders",
        element: <OrdersPage />
      },

      {
        path: "suppliers",
        element: allowAdmin(<SuppliersPage />)
      },

      {
        path: "reports",
        element: allowAdmin(<ReportsPage />)
      },

      {
        path: "settings",
        element: allowAdmin(<SettingsPage />)
      }
    ]
  },

  {
    path: "*",
    element: <Navigate to={roleHome()} replace />
  }
]);