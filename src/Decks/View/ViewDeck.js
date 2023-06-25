import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api/index';
import ListStudyDeckButton from "../List/ListStudyDeckButton"
import ListDeleteDeckButton from "../List/ListDeleteDeckButton"
import StudyNotEnoughCardsAddButton from "../Study/StudyNotEnoughCardsAddButton"


export default function ViewDeck({ decks, setDecks }) {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

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
            <ViewDeckEditButton deckId={deck.id} />
            <ListStudyDeckButton deckId={deck.id} />
            <StudyNotEnoughCardsAddButton deckId={deck.id} />
          </div>
          <div>
            <ListDeleteDeckButton deckId={deck.id} decks={decks} setDecks={setDecks} />
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
      <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary m-1">
        Edit
      </Link>
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

export function ViewDeckEditButton({ deckId }) {
  return (
    <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary m-1">
      Edit
    </Link>
  );
}
