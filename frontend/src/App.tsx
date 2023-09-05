import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileEdit" element={<ProfileEdit />} />
      </Routes>
    </div>
  );
}

export default App;
