import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from "react-leaflet"; // เพิ่ม Circle ที่นี่
import axios from "axios";
import "./App.css";
import "leaflet/dist/leaflet.css";
import {Icon} from "leaflet";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const center = [13.838504235249465, 100.02533369833033];
  // สร้างสถานะสำหรับเก็บข้อมูลร้านค้า
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({ lat: "", lng: "" });

  // ใช้ useEffect เพื่อดึงข้อมูลร้านค้าจาก Backend เมื่อคอมโพเนนต์โหลด
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

  // ฟังก์ชันเพื่อดึงตำแหน่งปัจจุบัน
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

     const LocationMap = () => {
       useMapEvents({
         click(e) {
           const { lat, lng } = e.latlng;
           setMyLocation({ lat, lng });
           console.log("Clicked at latitue:" + lat + "longitude:" + lng);
         },
       });
     };

  

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-4">Store Delivery Zone Checker</h1>
        <button onClick={handleGetLocation} className="btn btn-primary mb-4">
          Get My Location
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
            {/* แสดง Marker สำหรับร้านค้าทุกแห่ง */}
            {stores.map((store) => (
              <Marker key={store.id} position={[store.lat, store.lng]}>
                <Popup>
                  <strong>{store.name}</strong> <br />
                  {store.address} <br />
                  ระยะทาง: {store.distance.toFixed(2)} เมตร <br />
                  <a
                    href={store.direction}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ดูเส้นทาง
                  </a>
                  <Circle
                    center={[store.lat, store.lng]}
                    radius={store.raduis}
                    pathOptions={{
                      color: "green",
                      fillColor: "green",
                      fillOpacity: 0.2,
                    }}
                  />
                </Popup>
              </Marker>
            ))}
            {/* แสดง Marker สำหรับตำแหน่งของผู้ใช้ */}
            {myLocation.lat && myLocation.lng && (
              <>
                <Marker
                  position={[myLocation.lat, myLocation.lng]}
                  icon={
                    new L.Icon({
                      iconUrl:
                        "https://cdn-icons-png.flaticon.com/512/10751/10751558.png",
                      iconSize: [35, 35],
                    })
                  }
                >
                  <Popup>
                    <strong>Your Location</strong>
                  </Popup>
                </Marker>
                {/* แสดงวงกลมสำหรับอาณาเขตของผู้ใช้ */}
                <Circle
                  center={[myLocation.lat, myLocation.lng]}
                  radius={500}
                  pathOptions={{
                    color: "blue",
                    fillColor: "blue",
                    fillOpacity: 0.2,
                  }}
                />
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
