import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";

export const RestorePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { startRestorePassword } = useAuthStore();

  const onSubmit = (data) => {
    startRestorePassword(data);
    reset();
  };

  return (
    <div className="resetPassword animate__animated animate__slideInUp animate__fast">
      <form onSubmit={handleSubmit(onSubmit)} className="resetPassword__form">
        <h1>Restaurar Contraseña</h1>

        <input
          type="text"
          placeholder="Email*"
          {...register("email", { required: true })}
        />
        {errors?.email?.type === "required" &&
          toast.error("Email is required!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })}

        <p>
          Si el email coincide con su cuenta, le enviaremos un link para que
          restablezca su contraseña (Si no encuentras el correo revisa en la
          seccion de spam)
        </p>

        <button type="submit" className="resetPassword__form--btnReset">
          Reset Password
        </button>

        <Link to={"/auth/"} className="volverLogin">
          Volver al login
        </Link>
      </form>
    </div>
  );
};
