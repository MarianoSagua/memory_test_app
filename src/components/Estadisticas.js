import React, { useEffect, useState } from "react";
import IconoScore from "../images/IconoScore.png";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useUserLoged } from "../assets/useUserLoged";
import { useAuthState } from "react-firebase-hooks/auth";

const Estadisticas = () => {
  const userLoged = useUserLoged();
  const [userData, setUserData] = useState({});
  const [score, setScore] = useState(0);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        if (userLoged && userLoged.id) {
          const docRef = doc(db, "users", userLoged.id);

          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const dataDoc = docSnap.data();
              setUserData(dataDoc);

              const scores = dataDoc.wins.map((item) => item.score);
              const totalScore = scores.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              );
              setScore(totalScore);
            } else {
              toast.error("No se encontró el documento del usuario", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          } catch (error) {
            toast.error("Error al obtener los datos del usuario:" + error, {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
      };

      fetchUserData();
    }
  }, [userLoged, user]);

  if(user){
    return (
      <div className="estadisticas">
        <section className="estadisticas__img">
          <img src={IconoScore} alt="Icono Score" />
        </section>
  
        <section className="estadisticas__puntajes">
          <div className="estadisticas__puntajes--part">
            <h2>Puntuacion:</h2>
            <p>
              Menos de 30 segundos: <span>20 Puntos</span>{" "}
            </p>
            <p>
              Entre 30 segundos y 60 Segundos: <span>10 Puntos</span>{" "}
            </p>
            <p>
              Mas de 60 Segundos: <span>5 Puntos</span>{" "}
            </p>
          </div>
  
          <div className="estadisticas__puntajes--part">
            <h2>Mis Estadisticas:</h2>
            {/* <p>Partidas Jugadas: <span>{userData.wins.length}</span></p> */}
            <p>
              Partidas Jugadas: <span>{userData?.wins?.length || 0}</span>
            </p>
            <p>
              Mi Puntaje: <span>{score} Puntos</span>{" "}
            </p>
          </div>
        </section>
      </div>
    );
  }else{
    return (
      <div className="estadisticas">
        <h1 className="titleNoLogin">Debes iniciar sesion primero para ver estos datos!</h1>
      </div>
    );
  }

 
};

export default Estadisticas;
