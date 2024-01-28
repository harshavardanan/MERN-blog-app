import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PostReader from "./components/PostReader";
import { UserProvider } from "./UserContext";

const App = () => {
  return (
    <div
      class="
      min-h-fit
      box-border
      antialiased
      bg-gradient-to-r
      from-pink-300
      via-purple-300
      to-indigo-400
    "
    >
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<TextEditor />} />
          <Route path="/post/:id" element={<PostReader />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
