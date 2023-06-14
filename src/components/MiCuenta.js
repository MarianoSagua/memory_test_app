import React from "react";
import IconoPerfil from "../images/IconoPerfil.png";
import { useUserLoged } from "../assets/useUserLoged";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";

const MiCuenta = () => {
  const userLoged = useUserLoged();
  const [user] = useAuthState(auth);

  if (user) {
    return (
      <div className="cuenta">
        <section className="cuenta__perfil">
          <img src={IconoPerfil} alt="Icono Perfil" />
        </section>

        <section className="cuenta__info">
          <h3>
            {userLoged.name} {userLoged.surname}
          </h3>
          <h2>{userLoged.email}</h2>
        </section>
      </div>
    );
  } else {
    return (
      <div className="cuenta">
        <h1 className="titleNoLogin">Debes iniciar sesion primero para ver estos datos!</h1>
      </div>
    );
  }
};

export default MiCuenta;
