import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from './../pages/Register';
import AddStore from "../pages/AddStore";



const router = createBrowserRouter([
    {
      path: "/",
     element:<App />
    },
    {
        path: "/login",
        element:<Login />
    },
    {
        path:"/Home",
        element:<Home />
    },
    {
        path:"/register",
        element:<Register />
    },
    {
        path:"/addStore",
        element:<AddStore />
    }
]);

export default router;