import { useParams } from "react-router-dom";
import { NavBar } from "../components";
import { MemoTestView, PuntuacionView } from "../views";

export const MainPage = () => {
  const { parte } = useParams();

  return (
    <div className="memoContainer animate__animated animate__slideInUp animate__fast">
      <NavBar />

      {parte === "puntuacion" ? <PuntuacionView /> : <MemoTestView />}
    </div>
  );
};
