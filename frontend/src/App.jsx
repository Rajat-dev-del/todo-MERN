import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import { Routes, Route } from "react-router-dom";
import PageNoteFound from "./components/PageNoteFound";

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNoteFound/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
