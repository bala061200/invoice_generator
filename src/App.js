import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./loginscreen";
import Home from "./homescreen";
import Invoice from "./invoicescreen";

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

 


  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </Router>
  );
}




