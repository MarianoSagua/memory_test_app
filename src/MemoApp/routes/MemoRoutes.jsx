import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../auth/routes/AuthRoutes";
import { MainPage } from "../pages/MainPage";
import { useAuthStore, useMemoAppStore } from "../../hooks";
import { LandingView } from "../views";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { cards } from "../../assets/cards";

export const MemoRoutes = () => {
  const { status } = useAuthStore();
  const { setLoadCards } = useMemoAppStore();

  useCheckAuth();

  useEffect(() => {
    setLoadCards(cards);
  }, []);

  if (status === "checking") {
    return <LandingView />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/memo-container/:parte" element={<MainPage />} />
      <Route path="/memo-container/*" element={<Navigate to={"/"} />} />

      {status === "not-auth" && (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
