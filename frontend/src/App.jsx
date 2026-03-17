import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { ToastContainer } from "react-toastify";



const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");


    // ❌ Not logged in → force login
    if (!token && location.pathname !== "/login") {
      navigate("/login");
    }

    // ✅ Logged in → prevent going back to login
    if (token && location.pathname === "/login") {
      navigate("/");
    }

  }, [navigate, location.pathname]);


  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;

