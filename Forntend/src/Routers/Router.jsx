import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("./../pages/Register"));
const AddStore = lazy(() => import("../pages/AddStore"));
const EditStore = lazy(() => import("../pages/EditStore"));
const Layout = lazy(() => import("../component/Layout"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const UsePage = lazy(() => import("../pages/UsePage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const ProtectRegister = lazy(() => import("../pages/ProtectRegister"));
const NotAllowed = lazy(() => import("../pages/NotAllowed"));
const ModOrAdminPage = lazy(() => import("../pages/ModOrAdminPage"));
const UserProfile = lazy(() => import("../pages/UserProfile"));

import CheckStoreAdmin from "../pages/CheckStoreAdmin";
//import Login from "../pages/Login";
// import Home from "../pages/Home";
// import Register from "./../pages/Register";
// import AddStore from "../pages/AddStore";
// import EditStore from "../pages/EditStore";
// import Layout from "../component/Layout";
// import LandingPage from "../pages/LandingPage";
// import UsePage from "../pages/UsePage";
// import AdminPage from "../pages/AdminPage";
// import ProtectRegister from "../pages/ProtectRegister";
// import NotAllowed from "../pages/NotAllowed";
// import ModOrAdminPage from "../pages/ModOrAdminPage";
// import UserProfile from "../pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "/Home",
        element: (
          <UsePage>
            <Home />
          </UsePage>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: (
          <ProtectRegister>
            {" "}
            <Register />{" "}
          </ProtectRegister>
        ),
      },
      {
        path: "addStore",
        element: (
          <AdminPage>
            {" "}
            <AddStore />{" "}
          </AdminPage>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <AdminPage>
            <CheckStoreAdmin>
              <EditStore />
            </CheckStoreAdmin>
          </AdminPage>
        ),
      },
      {
        path: "/notAllowed",
        element: <NotAllowed />,
      },
      {
        path: "/UserProfile",
        element: <UserProfile />,
      },
    ],
  },
]);

export default router;
