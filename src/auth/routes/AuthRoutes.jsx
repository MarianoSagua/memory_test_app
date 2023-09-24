import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage, RestorePasswordPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/restore-password" element={<RestorePasswordPage />} />

      <Route path="/*" element={<Navigate to={"/auth/"} />} />
    </Routes>
  );
};
