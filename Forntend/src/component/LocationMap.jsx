// LocationMap.jsx
import { useMapEvents } from "react-leaflet";

const LocationMap = ({ setMyLocation }) => {
  
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMyLocation({ lat, lng });
      console.log("Clicked at latitude:" + lat + ", longitude:" + lng);
    },
  });

  return null; // ไม่มีการแสดงผลใน UI
};

export default LocationMap;


