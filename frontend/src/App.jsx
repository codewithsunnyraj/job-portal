import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </div>
  );
};

export default App;
