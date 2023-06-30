import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck } from '../../utils/api/index';
import StudyNotEnoughCardsAddButton from "../Study/StudyDeck"

export default function ViewDeck({ decks, setDecks }) {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchDeck() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
        console.log(response);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else {
          throw error;
        }
      }
    }

    fetchDeck();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete this deck? This cannot be undone.'
      )
    ) {
      await deleteDeck(deckId);

      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);

      history.push('/');
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="text-center">
            <h2>{deck.name}</h2>
          </div>
        </div>
        <div className="card-body">
          <h5>{deck.description}</h5>
        </div>
        <div className="card-footer border d-flex justify-content-between">
          <div className="d-flex">
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary m-1">
              Edit
            </Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary m-1">
              Study
            </Link>
            <StudyNotEnoughCardsAddButton deckId={deck.id} />
            <button onClick={handleDelete} className="btn btn-danger m-1">
              Delete Deck
            </button>
          </div>
        </div>
      </div>
      <div className="my-4">
        {deck.cards ? (
          deck.cards.map((card) => (
            <ViewDecksItemCardsList
              key={card.id}
              deck={deck}
              card={card}
              length={deck.cards.length}
            />
          ))
        ) : (
          <p>Loading cards...</p>
        )}
      </div>
    </div>
  );
}

export function ViewDecksItemCardsList({ deck, card, length }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="text-center">
          <h3>Card #{card.id} of {length}</h3>
        </div>
      </div>
      <div className="d-flex">
        <div className="card w-50">
          <h4 className="card-header text-center">Front</h4>
          <div className="card-body text-center p-5">
            <h5>{card.front}</h5>
          </div>
        </div>
        <div className="card w-50">
          <h4 className="card-header text-center">Back</h4>
          <div className="card-body text-center p-5">
            <h5>{card.back}</h5>
          </div>
        </div>
      </div>
      <div className="card-footer border d-flex justify-content-end">
        <div>
          <ViewDecksItemCardsListEditButton deckId={deck.id} cardId={card.id} />
        </div>
        <div>
          <ViewDecksItemCardsListDeleteButton cardId={card.id} />
        </div>
      </div>
    </div>
  );
}

export function ViewDecksItemCardsListDeleteButton() {
  return (
    <button className="btn btn-danger m-1">Delete</button>
  );
}

export function ViewDecksItemCardsListEditButton({ deckId, cardId }) {
  const editCardUrl = `/decks/${deckId}/cards/${cardId}/edit`;

  return (
    <div>
      <Link to={editCardUrl} className="btn btn-secondary m-1">
        Edit Card
      </Link>
    </div>
  );
}
