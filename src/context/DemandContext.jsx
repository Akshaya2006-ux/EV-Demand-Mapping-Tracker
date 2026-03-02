import { createContext, useContext, useState } from "react";

const DemandContext = createContext();

export const DemandProvider = ({ children }) => {
  const [routes, setRoutes] = useState({});

  // ✅ Start as null (important for realtime sync)
  const [evLocation, setEvLocation] = useState(null);

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