import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useUser } from "./customhooks/useUser";
import AddUser from "./pages/AddUser";
import AddPackage from "./pages/AddPackage";
import Loader from "./components/loader/Loader.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Packages from "./pages/Packages";
import Map from "./pages/Map";
import Warning from "./pages/Warning";
import "./App.css";
const App = () => {
  const [loading, setLoading] = useState(false);
  useUser(setLoading);
  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/add-user" element={<AddUser />} />
        <Route exact path="/add-package" element={<AddPackage />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/packages" element={<Packages />} />
        <Route exact path="/map" element={<Map />} />
        <Route exact path="/warnings" element={<Warning />} />
      </Routes>
    </Router>
  );
};

export default App;
