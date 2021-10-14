import cardBack from "../card-back.jpg";

function Card({ imageSrc, imageAlt, ...props }) {
  return (
    <>
      <img
        src={props.selected ? imageSrc : cardBack}
        alt={imageAlt}
        value={props.value}
        onClick={props.onClick}
      />
    </>
  );
}

export default Card;
