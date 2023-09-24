import { ItemCard } from "./ItemCard";

export const Board = ({ animals, animating, handleMemoCLick }) => {
  return (
    <div className="board">
      {animals.map((animal, idx) => {
        return (
          <ItemCard
            key={idx}
            animal={animal}
            animating={animating}
            handleMemoCLick={handleMemoCLick}
          />
        );
      })}
    </div>
  );
};
