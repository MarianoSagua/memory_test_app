import { useAuthStore, useMemoAppStore } from "../../hooks";
import { EmptyView } from "./EmptyView";

export const PuntuacionView = () => {
  const { status } = useAuthStore();
  const { user_wins } = useMemoAppStore();

  return (
    <div>
      {status === "auth" ? (
        <>
          <div className="puntuacionCards">
            <div className="puntuacionCards__one">
              <p className="puntuacionCards__one--puntos">
                140 <span>Puntos</span>{" "}
              </p>
            </div>
            <div className="puntuacionCards__two">
              <p className="puntuacionCards__two--promedio">
                00:40 <span>Promedio de Tiempo</span>
              </p>
            </div>
          </div>

          <div className="puntuacionUltimasPartidas">
            <h3>Ultimas Partidas</h3>

            <ul class="list-group">
              <li class="list-group-item">
                <span>Puntuacion</span>
                <span>Tiempo</span>
                <span>Fecha</span>
              </li>
              <li class="list-group-item">
                <span>Puntuacion</span>
                <span>Tiempo</span>
                <span>Fecha</span>
              </li>
              <li class="list-group-item">
                <span>Puntuacion</span>
                <span>Tiempo</span>
                <span>Fecha</span>
              </li>
              <li class="list-group-item">
                <span>Puntuacion</span>
                <span>Tiempo</span>
                <span>Fecha</span>
              </li>
              <li class="list-group-item">
                <span>Puntuacion</span>
                <span>Tiempo</span>
                <span>Fecha</span>
              </li>
              {user_wins.map((win) => {
                const fecha = new Date(win.date.seconds * 1000);
                const fechaFormateada = `${fecha.getDate()}/${
                  fecha.getMonth() + 1
                }/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()}`;

                return (
                  <li key={win.id} class="list-group-item">
                    <span>{win.score}</span>
                    <span>
                      {win.minutes} M - {win.seconds} S
                    </span>
                    <span>{fechaFormateada}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <EmptyView />
      )}
    </div>
  );
};
