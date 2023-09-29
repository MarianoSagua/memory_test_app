import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { startLogin, errorMessage } = useAuthStore();

  const onSubmit = (data) => {
    startLogin(data);
    reset();
  };

  return (
    <div className="login register animate__animated animate__slideInUp animate__fast">
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <h1>Log In</h1>
        <div className="login__form--inputs">
          <input
            type="email"
            placeholder="Email*"
            {...register("email", { required: true })}
          />
          {errors?.email?.type === "required" && (
            <div class="alert alert-danger border-0" role="alert">
              This field is required
            </div>
          )}

          <input
            type="password"
            placeholder="Password*"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors?.password?.type === "required" && (
            <div class="alert alert-danger border-0" role="alert">
              This field is required
            </div>
          )}
          {errors?.password?.type === "minLength" && (
            <div class="alert alert-danger border-0" role="alert">
              The password must contain al least 6 Caracthers!
            </div>
          )}
        </div>

        {errorMessage !== undefined && (
          <div class="alert alert-danger border-0" role="alert">
            {errorMessage}
          </div>
        )}

        <Link className="login__form--resetLink" to={"/auth/restore-password"}>
          Forgot your password?
        </Link>

        <p className="login__form--registerLink">
          Dont have an account?{" "}
          <Link to={"/auth/register"}>
            <span>Create One!</span>{" "}
          </Link>{" "}
        </p>

        <Link className="login__form--linkVolver" to={"/"}>
          Ir al Memotest
        </Link>

        <button type="submit" className="login__form--btnLogin">
          Log In
        </button>
      </form>
    </div>
  );
};
