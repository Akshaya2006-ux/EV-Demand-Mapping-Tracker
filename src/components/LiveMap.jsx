import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDemand } from "../context/DemandContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  iconSize: [40, 40],
});

const LiveMap = () => {
  const { evLocation } = useDemand();

  const campusCenter = [13.01164, 80.23606];

  const campusBounds = [
    [13.0050, 80.2280],
    [13.0165, 80.2405],
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg mt-6">
      <MapContainer
        center={campusCenter}
        zoom={17}
        minZoom={16}
        maxZoom={19}
        maxBounds={campusBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {evLocation && (
          <Marker position={[evLocation.lat, evLocation.lng]} icon={icon}>
            <Popup>EV is Live Here ⚡</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveMap;
