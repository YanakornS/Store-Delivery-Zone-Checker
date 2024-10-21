import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

const ProtectRegister = ({ children }) => {
  const { user } = useAuthContext(); 

  if (user) {
    return <Navigate to="/Home" />;
  }

  return children;
};

export default ProtectRegister;