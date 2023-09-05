import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import Profile from "./components/Profile";

// import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;
