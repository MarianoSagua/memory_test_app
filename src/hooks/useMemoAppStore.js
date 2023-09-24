import { useDispatch, useSelector } from "react-redux";
import { onLoadCards } from "../Redux/slices/memoSlice";

export const useMemoAppStore = () => {
  const { cards } = useSelector((state) => state.memo);
  const dispatch = useDispatch();

  const setLoadCards = (cards) => {
    dispatch(onLoadCards(cards));
  };

  return {
    cards,

    setLoadCards,
  };
};
