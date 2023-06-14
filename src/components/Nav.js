import React from "react";
import { auth } from "../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error("A ocurrido un error: " + error, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <nav className="nav">
      <ul>
        <li onClick={() => navigate("/chat-container/memo-test")}>Memo Test</li>
        <li onClick={() => navigate("/chat-container/estadisticas")}>
          Puntuacion
        </li>
        <li onClick={() => navigate("/chat-container/contacto")}>Contacto</li>
        <li onClick={() => navigate("/chat-container/mi-cuenta")}>Mi Cuenta</li>

        {user ? (
          <li onClick={handleSignOut}>Cerrar Sesion</li>
        ) : (
          <li onClick={() => navigate("/login")}>Iniciar Sesion</li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
