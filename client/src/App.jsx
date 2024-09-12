import React from "react";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
