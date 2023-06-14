import React from "react";
import Nav from "./Nav";
import MemoTest from "./MemoTest";
import { useParams } from "react-router-dom";
import Estadisticas from "./Estadisticas";
import Contacto from "./Contacto";
import MiCuenta from "./MiCuenta";

const ChatContainer = () => {
  const { parte } = useParams("/chat-container/:parte");
  
  if(parte === "memo-test"){
    return (
      <div className="chatContainer animate__animated animate__slideInUp animate__fast">
        <Nav />
        <MemoTest />
      </div>
    );
  }else if(parte === "estadisticas"){
    return (
      <div className="chatContainer animate__animated animate__slideInUp animate__fast">
        <Nav />
        <Estadisticas />
      </div>
    );
  }else if(parte === "contacto"){
    return (
      <div className="chatContainer animate__animated animate__slideInUp animate__fast">
        <Nav />
        <Contacto />
      </div>
    );
  }else if(parte === "mi-cuenta"){
    return (
      <div className="chatContainer animate__animated animate__slideInUp animate__fast">
        <Nav />
        <MiCuenta />
      </div>
    );
  }else{
    return (
      <div className="chatContainer animate__animated animate__slideInUp animate__fast">
        <Nav />
        <MemoTest />
      </div>
    );
  }
  
};

export default ChatContainer;




