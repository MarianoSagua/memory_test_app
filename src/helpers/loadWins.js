import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadWins = async (uid) => {
  if (!uid) throw new Error("El UID del usuario no existe");

  const collectionRef = collection(FirebaseDB, `/memory_game/${uid}/wins`);
  const docs = await getDocs(collectionRef);

  const wins = [];

  docs.forEach((doc) => {
    wins.push({ id: doc.id, ...doc.data() });
  });

  return { wins };
};
