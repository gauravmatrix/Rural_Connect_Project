/* eslint-disable react-refresh/only-export-components */
import { Suspense, createElement, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PageSkeleton from "../components/common/PageSkeleton";

const DashboardLayout = lazy(() => import("../components/layout/DashboardLayout"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const VerifyOtpPage = lazy(() => import("../pages/auth/VerifyOtpPage"));
const DashboardHomePage = lazy(() => import("../pages/dashboard/DashboardHomePage"));
const RaiseComplaintPage = lazy(() => import("../pages/complaints/RaiseComplaintPage"));
const MyComplaintsPage = lazy(() => import("../pages/complaints/MyComplaintsPage"));
const ComplaintDetailsPage = lazy(() => import("../pages/complaints/ComplaintDetailsPage"));
const CommunityPage = lazy(() => import("../pages/community/CommunityPage"));
const NotificationsPage = lazy(() => import("../pages/notifications/NotificationsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const RouteErrorPage = lazy(() => import("../pages/RouteErrorPage"));

const lazyElement = (Component) => (
  <Suspense fallback={<PageSkeleton />}>
    {createElement(Component)}
  </Suspense>
);

export const router = createBrowserRouter([
  { path: "/", element: lazyElement(LandingPage), errorElement: lazyElement(RouteErrorPage) },
  { path: "/login", element: lazyElement(LoginPage), errorElement: lazyElement(RouteErrorPage) },
  { path: "/register", element: lazyElement(RegisterPage), errorElement: lazyElement(RouteErrorPage) },
  { path: "/verify-otp", element: lazyElement(VerifyOtpPage), errorElement: lazyElement(RouteErrorPage) },
  {
    element: <ProtectedRoute />,
    errorElement: lazyElement(RouteErrorPage),
    children: [
      {
        path: "/",
        element: lazyElement(DashboardLayout),
        children: [
          { path: "/dashboard", element: lazyElement(DashboardHomePage) },
          { path: "/complaints/new", element: lazyElement(RaiseComplaintPage) },
          { path: "/complaints/my", element: lazyElement(MyComplaintsPage) },
          { path: "/complaints/:id", element: lazyElement(ComplaintDetailsPage) },
          { path: "/community", element: lazyElement(CommunityPage) },
          { path: "/notifications", element: lazyElement(NotificationsPage) },
        ],
      },
    ],
  },
  { path: "*", element: lazyElement(NotFoundPage), errorElement: lazyElement(RouteErrorPage) },
]);
