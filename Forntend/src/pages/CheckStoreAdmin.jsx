import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import StoreService from "../services/Store.services";
import { useEffect, useState } from "react";

const CheckStoreAdmin = ({ children }) => {
  const { user } = useAuthContext();
  const [userIDStore, setUserIDStore] = useState(null);
  const { id: storeId } = useParams();

  useEffect(() => {
    const fetchStoreById = async () => {
      try {
        const data = await StoreService.getStoreById(storeId);
       

        if (data && data.userId) {
          setUserIDStore(data.userId);
        } else {
          console.log("userId not found in data");
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreById();
  }, [storeId]);

  // Check if user and userIDStore are both available before evaluating
  if (userIDStore === null) {
    return null; // or a loading spinner while fetching data
  }

  const checkAdminStore = user && user.id === userIDStore;


  if (!checkAdminStore) {
    return <Navigate to="/notallowed" />;
  } else {
    return children;
  }
};

export default CheckStoreAdmin;
