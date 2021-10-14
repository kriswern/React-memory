import { useEffect, useState } from "react";
import Deck from "./components/Deck";
import "./App.css";

function App() {
  const cardPile = "AS,AH,KS,KH,QS,QH,JS,JH,0S,0H,9S,9H";

  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${cardPile}`
      );
      const data = await res.json();

      setDeck(data);
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    async function fetchCard() {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=12`
      );
      const data = await res.json();

      setCards(data.cards);
    }
    deck.deck_id && fetchCard();
  }, [deck]);

  function shuffleDeck() {
    async function shuffle() {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`
      );
      const data = await res.json();
      setDeck(data);
    }
    shuffle();
  }

  if (loading) return <div>Loading..</div>;

  if (!deck) return <div>Error!</div>;

  if (!cards) return <div></div>;

  return (
    <div className="App">
      <div className="Container">
        {<Deck cards={cards} shuffle={shuffleDeck} />}
      </div>
    </div>
  );
}

export default App;
