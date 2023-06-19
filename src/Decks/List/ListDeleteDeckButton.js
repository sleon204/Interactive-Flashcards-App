import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteDeck } from '../../utils/api/index';

export default function ListDeleteDeckButton({ deckId, decks, setDecks }) {
  const history = useHistory();

  const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this deck? This cannot be undone.')) {
          await deleteDeck(deckId);

          // After deleting, remove the deck from state.
          const updatedDecks = decks.filter((deck) => deck.id !== deckId);
          setDecks(updatedDecks);

          history.push('/');
      }
  };

  return (
      <button onClick={handleDelete} className="btn btn-danger m-1">
          Delete Deck
      </button>
  );
}
