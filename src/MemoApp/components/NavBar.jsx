import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks";
import LandingIcon from "../images/LandingIcon2.png";

export const NavBar = () => {
  const { status, user, startLogOut } = useAuthStore();

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid navbarNav">
        <Link class="navbar-brand" to={"/"}>
          <img
            src={LandingIcon}
            alt="Logo"
            width="50"
            height="50"
            class="d-inline-block align-text-top"
          />
        </Link>
        &nbsp; &nbsp;
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {status === "auth" ? (
              <>
                <li>
                  <Link className="linkNav" to={"/memo-container/puntuacion"}>
                    Puntuacion
                  </Link>
                </li>
                <li>
                  <Link className="linkNav" to={"/memo-container/cuenta"}>
                    {user.displayName}
                  </Link>
                </li>
                <li onClick={() => startLogOut()}>
                  <span className="linkNav">Cerrar Sesion</span>
                </li>
              </>
            ) : (
              <li className="navItemLogin">
                <Link className="linkNav " to={"/auth/"}>
                  {" "}
                  Iniciar Sesion
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
