import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks";
import LandingIcon from "../images/LandingIcon2.png";

export const NavBar = () => {
  const { status, user, startLogOut } = useAuthStore();

  return (
    <nav className="navApp">
      <ul>
        <li>
          <Link className="linkNav" to={"/memo-container/puntuacion"}>
            Puntuacion
          </Link>
        </li>

        <li>
          <Link className="linkNav" to={"/"}>
            <img
              src={LandingIcon}
              alt="MemoTest Icon"
              className="memoTestNavIcon"
            />
          </Link>
        </li>

        {status === "auth" ? (
          <>
            <li>
              <Link className="linkNav" to={"/memo-container/mi-cuenta"}>
                {user.displayName}
              </Link>
            </li>
            <li className="linkNav" onClick={() => startLogOut()}>
              Cerrar Sesion
            </li>
          </>
        ) : (
          <li>
            {" "}
            <Link className="linkNav" to={"/auth/"}>
              {" "}
              Iniciar Sesion
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
