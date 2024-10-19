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
import axios from "axios";
import "./App.css";
import Swal from "sweetalert2";

// Import icons
import Home from "../src/assets/Home.png";
import Seven from "../src/assets/stores.png"; // Replace with your actual path
import Seven2 from "../src/assets/stores2.png"; // Replace with your actual path

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const center = [13.838504235249465, 100.02533369833033];
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({ lat: "", lng: "" });
  const [activeStoreId, setActiveStoreId] = useState(null);
  const [deliveryZone, setDeliveryZone] = useState({
    lat: "",
    lng: "",
    radius: 0,
  });

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
        const response = await axios.get(`${BASE_URL}/api/stores`);
        setStores(response.data);
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

    if (distance <= deliveryZone.radius) {
      Swal.fire({
        title: "Success!",
        text: `Your location is within the delivery zone for ${
          store.name
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

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-4">Store Delivery Zone Checker</h1>
        <button onClick={handleGetLocation} className="btn btn-primary mb-4">
          Get My Location
        </button>
        <button onClick={handleLocationCheck} className="btn btn-primary mb-4 ">
          Check Delivery Availability
        </button>
        <div className="mapContainer w-full max-w-4xl">
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "75vh", width: "100vw" }}
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
                distance <= deliveryZone.radius
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
                        radius: store.radius,
                      });
                      setActiveStoreId(store.id); // Set active store ID on click
                    },
                  }}
                >
                  <Popup>
                    <strong>{store.name}</strong> <br />
                    {store.address} <br />
                    ระยะทาง: {distance.toFixed(2)} เมตร <br />
                    <a
                      href={store.direction}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ดูเส้นทาง
                    </a>
                    {activeStoreId === store.id && store.radius > 0 && (
                      <Circle
                        center={[store.lat, store.lng]}
                        radius={store.radius}
                        pathOptions={{
                          color: "green",
                          fillColor: "green",
                          fillOpacity: 0.2,
                        }}
                      />
                    )}
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
      </div>
    </>
  );
}

export default App;
