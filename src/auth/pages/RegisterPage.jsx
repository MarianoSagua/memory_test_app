import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";

export const RegisterPage = () => {
  const { startRegister, errorMessage } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    startRegister(data);
    reset();
  };

  return (
    <div className="register animate__animated animate__slideInUp animate__fast">
      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <h1>Register</h1>

        <div className="register__form--inputs">
          <div className="register__form--inputs--inputContainer">
            <input
              type="email"
              placeholder="Enter an Email*"
              {...register("email", { required: true })}
            />
            {errors?.email?.type === "required" && (
              <div class="alert alert-danger border-0" role="alert">
                This field is required
              </div>
            )}
          </div>

          <div className="register__form--inputs--inputContainer">
            <input
              type="password"
              placeholder="Create a Password*"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors?.password?.type === "required" && (
              <div class="alert alert-danger border-0" role="alert">
                This field is required
              </div>
            )}
            {errors?.password?.type === "minLength" && (
              <div class="alert alert-danger border-0" role="alert">
                Password must contain al least 6 caracthers
              </div>
            )}
          </div>

          <div className="register__form--inputs--inputContainer">
            <input
              type="text"
              placeholder="Enter your Name*"
              {...register("name", { required: true })}
            />
            {errors?.name?.type === "required" && (
              <div class="alert alert-danger border-0" role="alert">
                This field is required
              </div>
            )}
          </div>

          <div className="register__form--inputs--inputContainer">
            <input type="number" placeholder="Enter your Age*" />
            {errors?.age?.type === "required" && (
              <div class="alert alert-danger border-0" role="alert">
                This field is required
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="register__form--btnRegister">
          Register
        </button>

        {errorMessage !== undefined && (
          <>
            <div class="alert alert-danger mt-3 alertErrorAuth" role="alert">
              {errorMessage} Hola
            </div>
          </>
        )}

        <Link to={"/auth/"} className="volverLogin">
          Volver al login
        </Link>
      </form>
    </div>
  );
};
