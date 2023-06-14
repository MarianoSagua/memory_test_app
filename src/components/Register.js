import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  const registerAccount = () => {
    if (email !== "" && password !== "" && name !== "" && surname !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const docRef = collection(db, "users");
          
          addDoc(docRef, {
            email: email,
            name: name,
            surname: surname,
            uid: userCredential.user.uid,
            wins: []
          });

          navigate("/");
        })
        .catch((error) => {
          toast.error("A Ocurrido un error: " + error, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else {
      toast.warn("Debes completar todos los campos antes de registrarte!", {
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
    <div className="register animate__animated animate__slideInUp animate__fast">
      <section className="register__form">
        <h1>Register</h1>

        <div className="register__form--inputs">
          <div className="register__form--inputs--inputContainer">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter an Email*"
            />
          </div>

          <div className="register__form--inputs--inputContainer">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a Password*"
            />
          </div>

          <div className="register__form--inputs--inputContainer">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your Name*"
            />
          </div>

          <div className="register__form--inputs--inputContainer">
            <input
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              placeholder="Enter your Surname*"
            />
          </div>
        </div>

        <button
          onClick={registerAccount}
          className="register__form--btnRegister"
        >
          Register
        </button>

        <Link to={"/login"} className="volverLogin">
          Volver al login
        </Link>
      </section>
    </div>
  );
};

export default Register;
