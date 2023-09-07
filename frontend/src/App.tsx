import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header"
import Home from "./components/Home";
import Profile from "./components/Profile";



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:user_id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
