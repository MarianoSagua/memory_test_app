import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { onLogIn, onLogOut } from "../Redux/slices/authSlice";

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(onLogOut());

      const { uid, email, displayName, photoURL } = user;
      dispatch(onLogIn({ uid, email, displayName, photoURL }));
    });
  }, []);
};
