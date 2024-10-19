import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MyLocationIcon from "../assets/home.png"; // เปลี่ยนให้ตรงกับ path ของไอคอนที่คุณใช้
import Seven from "../assets/seven-icon.png"; // เปลี่ยนให้ตรงกับ path ของไอคอนร้านค้า

const LocationMap = ({ center, stores, myLocation, deliveryZone, handleStoreClick }) => {
  const myLocationIcon = new Icon({
    iconUrl: MyLocationIcon,
    iconSize: [35, 35],
  });

  const storeIcon = new Icon({
    iconUrl: Seven,
    iconSize: [35, 35],
  });

  return (
    <MapContainer center={center} zoom={13} style={{ height: "75vh", width: "100vw" }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {myLocation.lat && myLocation.lng && (
        <Marker position={[myLocation.lat, myLocation.lng]} icon={myLocationIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={storeIcon}
          eventHandlers={{
            click: () => handleStoreClick(store),
          }}
        >
          <Popup>
            <strong>{store.name}</strong> <br />
            {store.address} <br />
            <a href={store.direction} target="_blank" rel="noopener noreferrer">ดูเส้นทาง</a>
            {deliveryZone.lat === store.lat && deliveryZone.lng === store.lng && deliveryZone.radius > 0 && (
              <Circle center={[store.lat, store.lng]} radius={deliveryZone.radius} pathOptions={{ color: "green", fillColor: "green", fillOpacity: 0.2 }} />
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;
