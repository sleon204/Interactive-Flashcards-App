import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewDecksItemCardsListEditButton({ deckId, cardId }) {
  const editCardUrl = `/decks/${deckId}/cards/${cardId}/edit`;

  return (
    <div>
      <Link to={editCardUrl} className="btn btn-secondary m-1">
        Edit Card
      </Link>
    </div>
  );
}
