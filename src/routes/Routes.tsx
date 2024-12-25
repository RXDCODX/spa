import { BrowserRouter, Route, Routes } from "react-router-dom";

import PyroAlerts from "../components/PyroAlerts/PyroAlerts";
import FireShader from "../components/shaders/FireShader/FireShader";
import WaifuAlerts from "../components/WaifuAlerts/WaifuAlerts";
import { ErrorPage } from "./ErrorPage";

/** Приватные роуты. */
const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>LOH</div>} />

        <Route path="/pyroalerts" element={<PyroAlerts />} />
        <Route
          path="/waifu"
          Component={WaifuAlerts}
          element={<WaifuAlerts />}
        />
        <Route path="/fireshader" element={<FireShader />} />
      </Routes>
    </BrowserRouter>
  );
};

PrivateRoutes.displayName = "PrivateRoutes";

export default PrivateRoutes;
