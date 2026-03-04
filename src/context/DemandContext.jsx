import { createContext, useContext, useState, useEffect } from "react";
import { database, auth } from "../firebase";
import { ref, set, onValue, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const DemandContext = createContext();

export const DemandProvider = ({ children }) => {
  const [routes, setRoutes] = useState({});
  const [evLocation, setEvLocation] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthReady(true);

        // 🔥 Attach listeners AFTER auth
        const routesRef = ref(database, "routes");
        const locationRef = ref(database, "evLocation");

        onValue(routesRef, (snapshot) => {
          const data = snapshot.val();
          setRoutes(data || {});
        });

        onValue(locationRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setEvLocation(data);
        });
      } else {
        setIsAuthReady(false);
        setRoutes({});
        setEvLocation(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const voteRoute = (from, to) => {
    if (!isAuthReady) return;

    const key = `${from} → ${to}`;
    update(ref(database, "routes"), {
      [key]: (routes[key] || 0) + 1,
    });
  };

  const updateLocation = (lat, lng) => {
    if (!isAuthReady) return;

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