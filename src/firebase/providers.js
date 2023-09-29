import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

export const registerProvider = async ({ email, password, name, age }) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    await updateProfile(FirebaseAuth.currentUser, { displayName: name });

    const user = {
      email,
      name,
      age,
      displayName: name,
      photoURL,
      uid,
    };

    return {
      ok: true,
      user,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "There was an error registering the user, Try Again !",
    };
  }
};

export const loginProvider = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = resp.user;

    const user = {
      uid,
      photoURL,
      email,
      displayName,
    };

    return {
      ok: true,
      user,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "There was an error in the login, Try Again !",
    };
  }
};

export const logOutProvider = async () => {
  return await FirebaseAuth.signOut();
};

export const restorePasswordProvider = async (email) => {
  try {
    await sendPasswordResetEmail(FirebaseAuth, email);

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "There was an error",
    };
  }
};
