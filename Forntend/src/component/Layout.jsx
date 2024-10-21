import { Outlet } from "react-router-dom";
import { AuthProvider } from "../Contexts/AuthContext";
import Footer from "./Footer";
import Navbar from "./Nvabar"; // แก้ไขจาก Nvabar เป็น Navbar


const Layout = () => {
  return (
    <>
      
      <Navbar />
<div className="bg-gradient-to-r from-[#B7E9B2] to-[#A5D48C]  shadow-lg min-h-screen flex flex-col">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer className="flex-shrink-0" /> 
      </div>
    </>
  );
};

export default Layout;
