import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck } from './utils/api/index';
import Breadcrumbs from './Layout/Breadcrumbs';

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      const deckFromAPI = await readDeck(deckId);
      setDeck(deckFromAPI);
    };

    fetchDeck();
  }, [deckId]);

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleNext = () => {
    if (currentCard + 1 < deck.cards.length) {
      setCurrentCard(currentCard + 1);
      setFlip(false);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleConfirmation = (confirm) => {
    setShowConfirmation(false);
    if (confirm) {
      setCurrentCard(0);
      setFlip(false);
    } else {
      history.push('/');
    }
  };

  if (!deck) return null;

  if (deck.cards.length < 3) {
    return (
      <div className="text-center">
        <h2>{deck.name}</h2>
        <div className="card ">
          <div className="card-header">
            <h4>Not enough cards</h4>
          </div>
          <div className="card-body">
            <p>
              You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
            </p>
          </div>
          <div className="card-footer">
            <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
              Add Cards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbsLinks = [
    { label: 'Home', url: '/' },
    { label: 'Deck', url: `/decks/${deckId}` },
    { label: 'Study', url: `/decks/${deckId}/study` },
  ];

  return (
    <div className="card text-center">
      <Breadcrumbs links={breadcrumbsLinks} />
      <div className="card-header">
        <div className="deck-info">
          <h2>{deck.name}</h2>
          <p>
            Card {currentCard + 1} of {deck.cards.length}
          </p>
        </div>
      </div>
      <div>
        <div className="card-body">
          <p>{flip ? deck.cards[currentCard].back : deck.cards[currentCard].front}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary ml-1" onClick={handleFlip}>
            Flip
          </button>
          {flip && (
            <button className="btn btn-primary ml-1" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
      {showConfirmation && (
        <div className="card-footer">
          <p>You have finished all the cards. Do you want to restart the deck?</p>
          <button className="btn btn-primary ml-1" onClick={() => handleConfirmation(true)}>
            Restart
          </button>
          <button className="btn btn-secondary ml-1" onClick={() => handleConfirmation(false)}>
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Study;
