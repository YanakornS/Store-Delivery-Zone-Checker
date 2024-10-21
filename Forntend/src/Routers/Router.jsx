import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "./../pages/Register";
import AddStore from "../pages/AddStore";
import EditStore from "../pages/EditStore";
import Layout from "../component/Layout";
import LandingPage from "../pages/LandingPage";
import UsePage from "../pages/UsePage";
import AdminPage from "../pages/AdminPage";
import ProtectRegister from "../pages/ProtectRegister";
import NotAllowed from "../pages/NotAllowed";
import ModOrAdminPage from "../pages/ModOrAdminPage";


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
        element: <ProtectRegister> <Register /> </ProtectRegister> ,
      },
      {
        path: "addStore", 
        element: <AdminPage> <AddStore /> </AdminPage> ,
      },
      {
        path: "edit/:id", 
        element: <ModOrAdminPage> <EditStore /> </ModOrAdminPage> ,
      },
      {
        path:"/notAllowed",
        element: <NotAllowed />,
      }
    ],
  },
]);

export default router;
