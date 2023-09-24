import IconoCard from "../images/IconoCard.png";

export const ItemCard = ({ animal, animating, handleMemoCLick }) => {
  const { item, flipped } = animal;

  return (
    <div
      className="flip-card animate__animated animate__fadeIn"
      onClick={() => (!flipped && !animating) && handleMemoCLick(animal)}
    >
      <div className={`flip-card-inner ${flipped && "memo-block-flipped"}`}>
        <div className="flip-card-front">
          <img src={IconoCard} alt="Icono Card" />
        </div>

        <div className="flip-card-back">
          <img src={item.image} alt={item.nombre} />
        </div>
      </div>
    </div>
  );
};




