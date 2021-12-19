import React from "react";
import "./App.css";
// import { Button } from "@chakra-ui/button";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ForgotPage from "./pages/ForgotPage";
function App() {
  return (
    <div className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/chats" component={ChatPage} />
      <Route path="/forgot-password" component={ForgotPage} />
    </div>
  );
}

export default App;
