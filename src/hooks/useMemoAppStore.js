import { useDispatch, useSelector } from "react-redux";
import { onLoadCards, onLoadUserWins } from "../Redux/slices/memoSlice";
import { doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { loadWins } from "../helpers/loadWins";
import { useAuthStore } from "./useAuthStore";

export const useMemoAppStore = () => {
  const { cards, user_wins } = useSelector((state) => state.memo);
  const { user } = useAuthStore();
  const dispatch = useDispatch();

  const setLoadCards = (cards) => {
    dispatch(onLoadCards(cards));
  };

  const setAddWin = async ({ timeGameMinutes, timeGameSeconds, score }) => {
    const winData = {
      minutes: timeGameMinutes,
      seconds: timeGameSeconds,
      score,
      date: new Date(),
      user: user.uid,
    };

    try {
      const docRef = doc(
        FirebaseDB,
        `/memory_game/${winData.user}/wins/win nº${user_wins.length + 1}`
      );
      await setDoc(docRef, winData);
    } catch (error) {
      console.log(error);
    }
  };

  const setLoadUserWins = async (uid) => {
    try {
      const { wins } = await loadWins(uid);
      dispatch(onLoadUserWins(wins));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    cards,
    user_wins,

    setLoadCards,
    setAddWin,
    setLoadUserWins,
  };
};
