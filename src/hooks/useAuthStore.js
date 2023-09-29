import { useDispatch, useSelector } from "react-redux";
import { checkingAuth, onLogIn, onLogOut } from "../Redux/slices/authSlice";
import {
  logOutProvider,
  loginProvider,
  registerProvider,
  restorePasswordProvider,
} from "../firebase/providers";
import { toast } from "react-toastify";

export const useAuthStore = () => {
  const { user, errorMessage, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startRegister = async ({ email, password, name, age }) => {
    dispatch(checkingAuth());

    const { ok, user, errorMessage } = await registerProvider({
      email,
      password,
      name,
      age,
    });

    const { photoURL, uid } = user;

    if (!ok) return dispatch(onLogOut(errorMessage));
    dispatch(onLogIn({ email, age, name, photoURL, uid }));
  };

  const startLogin = async ({ email, password }) => {
    dispatch(checkingAuth());

    const { ok, user, errorMessage } = await loginProvider({
      email,
      password,
    });

    const { age, displayName, photoURL, uid } = user;

    if (!ok) return dispatch(onLogOut(errorMessage));
    dispatch(onLogIn({ email, age, displayName, photoURL, uid }));
  };

  const startLogOut = async () => {
    logOutProvider();
    dispatch(onLogOut());
  };

  const startRestorePassword = async ({ email }) => {
    dispatch(checkingAuth());
    const { ok, errorMessage } = await restorePasswordProvider(email);

    if (!ok) return dispatch(onLogOut(errorMessage));

    toast.success("Email Sent!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return {
    status,
    user,
    errorMessage,

    startRegister,
    startLogin,
    startLogOut,
    startRestorePassword,
  };
};
