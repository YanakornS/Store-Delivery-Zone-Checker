import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Swal from "sweetalert2";
import Tokenservice from "../services/token.services"; // ปรับเส้นทางให้ตรงกับที่คุณเก็บ Tokenservice
import api from "../services/api";
import StoreService from "../services/Store.services";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Import icons
import Home from "../assets/Home.png";
import Seven from "../assets/stores.png"; // Replace with your actual path
import Seven2 from "../assets/stores2.png"; // Replace with your actual path

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORE_API = import.meta.env.VITE_Store_API;

const ComponentMap = () => {
  const center = [13.838504235249465, 100.02533369833033];
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({ lat: "", lng: "" });
  const [activeStoreId, setActiveStoreId] = useState(null);
  const [deliveryZone, setDeliveryZone] = useState({
    lat: "",
    lng: "",
    deliveryRadius: 0,
  });
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Define icons for stores
  const inDeliveryZoneIcon = new Icon({
    iconUrl: Seven,
    iconSize: [35, 35],
  });

  const outOfDeliveryZoneIcon = new Icon({
    iconUrl: Seven2,
    iconSize: [35, 35],
  });

  // function to calculate distance between 2 points using Haversine Formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await StoreService.getAllStores();
        setStores(data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStores();
  }, []);

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    if (myLocation.lat === "" || myLocation.lng === "") {
      Swal.fire({
        title: "Error!",
        text: "Please get your location first.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const store = stores.find((store) => store.id === activeStoreId);

    if (!store) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store first.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      store.lat,
      store.lng
    );

    if (distance <= deliveryZone.deliveryRadius) {
      Swal.fire({
        title: "Success!",
        text: `Your location is within the delivery zone for ${
          store.storeName
        }. Distance: ${distance.toFixed(2)} meters.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Not Available",
        text: `Your location is outside the delivery zone for ${
          store.name
        }. Distance: ${distance.toFixed(2)} meters.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const LocationMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMyLocation({ lat, lng });
        console.log("Clicked at latitude:" + lat + ", longitude:" + lng);
      },
    });
  };

  const handleStoreCheck = (storeId) => {
    if (activeStoreId === storeId) {
      setActiveStoreId(null); // Clear active store if it's already selected
    } else {
      setActiveStoreId(storeId); // Set the active store
    }
  };

  const handleDeleteStore = async (storeId) => {
    const accessToken = Tokenservice.getLocalAccessToken();
    console.log("Access Token:", accessToken); // ตรวจสอบว่ามี access token หรือไม่
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No access token found",
      });
      return;
    }
    // แสดง SweetAlert เพื่อให้ผู้ใช้ยืนยันการลบ
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`${STORE_API}/${storeId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            Swal.fire(
              "Deleted!",
              "The store has been deleted.",
              "success"
            ).then(() => {
              // รีเฟรชหน้าเมื่อผู้ใช้กดปิด SweetAlert
              window.location.reload();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error deleting store: " + error.message,
          });
        }
      }
    });
  };
  const handleEditStore = (id) => {
    navigate(`/edit/${id}`); // navigate to the edit page with the specified id
  };

  return (
    <>
      <div
        className="button-container "
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={handleGetLocation}
          className="btn btn-primary mx-2 transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105"
          style={{
            background: "linear-gradient(to right, #3b82f6, #60a5fa)", // ไล่สีจากฟ้าเข้มไปฟ้าสว่าง
            border: "none",
          }}
        >
          Get My Location
        </button>
        <button
          onClick={handleLocationCheck}
          className="btn btn-primary mx-2 transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105"
          style={{
            background: "linear-gradient(to right, #3b82f6, #60a5fa)", // ไล่สีจากฟ้าเข้มไปฟ้าสว่าง
            border: "none",
          }}
        >
          Check Delivery Availability
        </button>
      </div>
      <div className="mapContainer w-full max-w-4xl">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "75vh", width: "99vw" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stores.map((store) => {
            const distance = calculateDistance(
              myLocation.lat,
              myLocation.lng,
              store.lat,
              store.lng
            );
            const icon =
              distance <= deliveryZone.deliveryRadius
                ? inDeliveryZoneIcon
                : outOfDeliveryZoneIcon;

            return (
              <Marker
                key={store.id}
                position={[store.lat, store.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    setDeliveryZone({
                      lat: store.lat,
                      lng: store.lng,
                      deliveryRadius: store.deliveryRadius,
                    });
                    setActiveStoreId(store.id); // Set active store ID on click
                  },
                }}
              >
                <Popup>
                  <strong>{store.storeName}</strong> <br />
                  {store.address} <br />
                  ระยะทาง: {distance.toFixed(2)} เมตร <br />
                  <a
                    href={store.direction}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ดูเส้นทาง
                  </a>
                  <br />
                  {/* ปุ่มแก้ไข */}
                  {/* ปุ่มแก้ไข */}
                  <div>
                    {user &&
                   
                      (user.roles.includes("ROLES_MODERATOR") ||
                        user.roles.includes("ROLES_ADMIN") || user.roles.includes("ROLES_USER"))  && (
                        <div className="card-actions justify-center flex flex-col items-center">
                          <div className="text-center">
                            <h2 className="text-xs font-semibold mb-1">
                              {store.name}
                            </h2>{" "}
                            {/* ขนาดเล็กลง */}
                            <div className="flex gap-1">
                              {" "}
                              {/* ระยะห่างระหว่างปุ่ม */}
                              {/* เงื่อนไขสำหรับปุ่ม Delete (เฉพาะ ROLES_ADMIN เท่านั้น) */}
                              {user.roles.includes("ROLES_ADMIN") && (
                                <button
                                  onClick={() => handleDeleteStore(store.id)}
                                  className="btn btn-error btn-sm" // ขนาดปุ่มเล็ก
                                >
                                  Delete
                                </button>
                              )}
                              {/* เงื่อนไขสำหรับปุ่ม Edit (เฉพาะ ROLES_MODERATOR และ ROLES_ADMIN) */}
                              {(user.roles.includes("ROLES_MODERATOR") ||
                                user.roles.includes("ROLES_ADMIN")) && (
                                <button
                                  onClick={() => handleEditStore(store.id)}
                                  className="btn btn-primary btn-sm" // ขนาดปุ่มเล็ก
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                          </div>
                                
                          {/* เงื่อนไขแสดงวงกลมแสดงขอบเขตการจัดส่ง */}
                          {activeStoreId === store.id &&
                            store.deliveryRadius > 0 && (
                              <Circle
                                center={[store.lat, store.lng]}
                                radius={store.deliveryRadius}
                                pathOptions={{
                                  color: "green",
                                  fillColor: "green",
                                  fillOpacity: 0.2,
                                }}
                              />
                            )}
                        </div>
                        
                      )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {myLocation.lat && myLocation.lng && (
            <>
              <Marker
                position={[myLocation.lat, myLocation.lng]}
                icon={
                  new Icon({
                    iconUrl: Home,
                    iconSize: [35, 35],
                  })
                }
              >
                <Popup>
                  <strong>Your Location</strong>
                </Popup>
              </Marker>
            </>
          )}
          <LocationMap />
        </MapContainer>
      </div>
    </>
  );
};

export default ComponentMap;
