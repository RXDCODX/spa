import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { FumoFriday } from "../components/FumoFriday";
import PyroAlerts from "../components/PyroAlerts/PyroAlerts";
import WaifuAlerts from "../components/WaifuAlerts/WaifuAlerts";

/** Приватные роуты. */
const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pyroalerts" element={<PyroAlerts />} />
        <Route
          path="/waifu"
          Component={WaifuAlerts}
          element={<WaifuAlerts />}
        />
        <Route path="/fumofriday" element={<FumoFriday />} />

        <Route path="*" element={<Navigate to="/pyroalerts" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

PrivateRoutes.displayName = "PrivateRoutes";

export default PrivateRoutes;
