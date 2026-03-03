import { createContext, useContext, useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, set, onValue, update } from "firebase/database";

const DemandContext = createContext();

export const DemandProvider = ({ children }) => {
  const [routes, setRoutes] = useState({});
  const [evLocation, setEvLocation] = useState(null);

  // 🔥 Listen for votes (Realtime)
  useEffect(() => {
    const routesRef = ref(database, "routes");

    const unsubscribe = onValue(routesRef, (snapshot) => {
      const data = snapshot.val();
      setRoutes(data || {});
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Listen for EV location (Realtime)
  useEffect(() => {
    const locationRef = ref(database, "evLocation");

    const unsubscribe = onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEvLocation(data);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Vote function (saves to Firebase)
  const voteRoute = (from, to) => {
    const key = `${from} → ${to}`;

    update(ref(database, "routes"), {
      [key]: (routes[key] || 0) + 1,
    });
  };

  // 🔥 Update EV location
  const updateLocation = (lat, lng) => {
    set(ref(database, "evLocation"), {
      lat,
      lng,
    });
  };

  return (
    <DemandContext.Provider
      value={{
        routes,
        voteRoute,
        evLocation,
        updateLocation,
      }}
    >
      {children}
    </DemandContext.Provider>
  );
};

export const useDemand = () => useContext(DemandContext);