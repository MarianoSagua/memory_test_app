import React from "react";
import Login from "../components/Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import ResetPassword from "./ResetPassword";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatContainer />} />
      <Route path="/chat-container/:parte" element={<ChatContainer />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default Main;
