import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async () => {
    if (email !== "" && password !== "") {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        toast.error("El email o la contraseña que ingresaste no es valido.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.warn("Debes completar todos los campos antes de iniciar sesion!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="login animate__animated animate__slideInUp animate__fast">
      <section className="login__form">
        <h1>Log In</h1>

        <div className="login__form--inputs">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email*"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password*"
          />
        </div>

        <Link className="login__form--resetLink" to={"/reset-password"}>
          Forgot your password?
        </Link>

        <p className="login__form--registerLink">
          Dont have an account?{" "}
          <Link to={"/register"}>
            <span>Create One!</span>{" "}
          </Link>{" "}
        </p>

        <Link className="login__form--linkVolver" to={"/"}>
          Ir al Memotest
        </Link>

        <button onClick={handleLogIn} className="login__form--btnLogin">
          Log In
        </button>
      </section>
    </div>
  );
};

export default Login;
