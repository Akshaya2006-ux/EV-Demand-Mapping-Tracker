import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDemand } from "../context/DemandContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ ADD THESE IMPORTS
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  iconSize: [40, 40],
});

const LiveMap = () => {
  const { evLocation, setEvLocation } = useDemand(); // ✅ include setEvLocation

  // CEG Anna University Center
  const campusCenter = [13.0109, 80.2337];

  // Restrict map within campus boundary
  const campusBounds = [
    [13.0050, 80.2280], // South West
    [13.0165, 80.2405], // North East
  ];

  // ✅ REALTIME LISTENER FROM FIREBASE
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "live", "ev1"), (docSnap) => {
      if (docSnap.exists()) {
        setEvLocation(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [setEvLocation]);

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

        {/* ✅ Show marker ONLY if location exists */}
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