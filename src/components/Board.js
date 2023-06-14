import React from "react";
import ItemCard from "./ItemCard";

const Board = ({ animals, animating, handleMemoCLick }) => {
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

export default Board;
