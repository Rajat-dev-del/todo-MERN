import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNoteFound from "./components/PageNoteFound";
import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
