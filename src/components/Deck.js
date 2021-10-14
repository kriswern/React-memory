import { useEffect, useState } from "react";
import Card from "./Card";

function Deck({ cards, ...props }) {
  const [currentCards, setCurrentCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  function selectCard(i) {
    setSelectedCard((selected) => [...selected, i]);
  }

  useEffect(() => {
    setCurrentCards(cards);
  }, [cards]);

  useEffect(() => {
    if (selectedCard < 2) return;

    const firstSelected = currentCards[selectedCard[0]];
    const secondSelected = currentCards[selectedCard[1]];

    if (secondSelected && firstSelected.value === secondSelected.value) {
      if (firstSelected.suit !== secondSelected.suit) {
        setMatched((m) => [...m, firstSelected.value]);
      }
    }

    if (selectedCard.length === 2) setTimeout(() => setSelectedCard([]), 600);
  }, [selectedCard, currentCards]);

  useEffect(() => {
    if (matched.length === 6) {
      setTimeout(() => setGameOver(true), 600)
    }
  }, [matched]);

  useEffect(() => {
    if (gameOver === true) {
      setMatched([]);
      setSelectedCard([]);
      props.shuffle();
      setGameOver(false);
    }
  }, [gameOver, props]);

  function handleShuffle() {
    setTimeout(() => setGameOver(true), 600)
  }

  if (!cards) return <div></div>;
  
  return (
    <>
      {currentCards.map((card, index) => {
        let isSelected = false;

        if (selectedCard.includes(index)) isSelected = true;
        if (matched.includes(card.value)) isSelected = true;

        return (
          <Card
            key={index}
            imageSrc={card.image}
            imageAlt={card.code}
            value={card.value}
            selected={isSelected}
            onClick={() => selectCard(index)}
          />
        );
      })}
      <button onClick={() => handleShuffle()}>New Game</button>
    </>
  );
}

export default Deck;
