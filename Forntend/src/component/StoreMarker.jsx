// StoreMarker.jsx
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const StoreMarker = ({
  store,
  icon,
  onClick,
  myLocation,
  deliveryRadius,
}) => {
  const distance = calculateDistance(myLocation.lat, myLocation.lng, store.lat, store.lng);

  return (
    <Marker
      key={store.id}
      position={[store.lat, store.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onClick(store.id),
      }}
    >
      <Popup>
        <strong>{store.storeName}</strong> <br />
        {store.address} <br />
        Distance: {distance.toFixed(2)} meters
      </Popup>
    </Marker>
  );
};

export default StoreMarker;
