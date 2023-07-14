import React, { useEffect, useState } from 'react';
import { listDecks, deleteDeck } from './utils/api/index';
import { Link } from 'react-router-dom';

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const decksFromApi = await listDecks();
        setDecks(decksFromApi);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    try {
      await deleteDeck(deckId);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {decks.map((deck) => (
        <div className="card" key={deck.id}>
          <div className="card-header">
            <h2>{deck.name}</h2>
            <p>{deck.cards.length} cards</p>
          </div>
          <div className="card-body">
            {deck.description}
          </div>
          <div className="card-footer d-flex justify-content-between">
            <div>
            <Link to={`/decks/${deck.id}`} className="btn btn-primary ml-1">View Deck</Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary ml-1">Study Deck</Link>
            </div>
            <div>
            <button
              className="btn btn-danger ml-1"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              Delete Deck
            </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeckList;
