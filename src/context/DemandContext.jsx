import { createContext, useContext, useState } from "react";

const DemandContext = createContext();

export const DemandProvider = ({ children }) => {
  const [routes, setRoutes] = useState({});
  const [evLocation, setEvLocation] = useState({
    lat: 13.0827,
    lng: 80.2707,
  }); // default location

  const voteRoute = (from, to) => {
    const key = `${from} → ${to}`;
    setRoutes((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  return (
    <DemandContext.Provider
      value={{ routes, voteRoute, evLocation, setEvLocation }}
    >
      {children}
    </DemandContext.Provider>
  );
};

export const useDemand = () => useContext(DemandContext);