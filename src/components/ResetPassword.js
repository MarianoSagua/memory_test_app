import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (email !== "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Le hemos enviado un link a su email para que restablezca su contraseña", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            navigate("/login");
          }, 6000);
        })
        .catch((error) => {
          toast.error("No se a encontrado ninguna cuenta con ese email !", {
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
    } else {
      toast.error("No a ingresado ningun email !", {
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
    <div className="resetPassword animate__animated animate__slideInUp animate__fast">
      <section className="resetPassword__form">
        <h1>Reset Password</h1>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email*"
        />

        <p>
          Si el email coincide con su cuenta, le enviaremos un link para que
          restablezca su contraseña (Si no encuentras el correo revisa en la seccion de spam)
        </p>

        <button
          onClick={handleResetPassword}
          className="resetPassword__form--btnReset"
        >
          Reset Password
        </button>

        <Link to={"/login"} className="volverLogin">
          Volver al login
        </Link>
      </section>
    </div>
  );
};

export default ResetPassword;
