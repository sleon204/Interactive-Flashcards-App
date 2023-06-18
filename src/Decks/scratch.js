import React, { useState, useEffect } from 'react';
import StudyDeckItem from './StudyDeckItem';
import { readDeck, readCard } from '../utils/api/index';
import { useParams } from 'react-router-dom';

export default function StudyDeck() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const { deckId, cardId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchDeck() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
        console.log(response)
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

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;

  //   async function fetchCard() {
  //     try {
  //       const response = await readCard(cardId, signal);
  //       setCard(response);
  //     } catch (error) {
  //       if (error.name === 'AbortError') {
  //         console.log('Aborted');
  //       } else {
  //         throw error;
  //       }
  //     }
  //   }
  //   fetchCard();
  //   return () => {
  //     abortController.abort();
  //   };
  // }, [cardId]);

  // useEffect(() => {
  //   if (deck.cards && deck.cards.length > 0) {
  //     const cardIndex = deck.cards.findIndex((card) => card.id === parseInt(cardId));
  //     setCurrentIndex(cardIndex !== -1 ? cardIndex : 0);
  //   }
  // }, [deck, cardId]);

  return (
    <div>
      <StudyDeckItem deck={deck} card={deck.cards} />
    </div>
  );
}





import React from 'react';
import StudyDeckFlipButton from './StudyDeckFlipButton';
import StudyDeckNextButton from './StudyDeckNextButton';

export default function StudyDeckItem({ deck }) {
  const { name, cards } = deck;

  return (
    <div>
      <h2>{name}: Study</h2>
      {cards && cards.length > 0 ? (
        cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-header">
              <h6>{card.front}</h6>
            </div>
            <div className="card-body">
              <p>{card.back}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No cards available</p>
      )}
      <p>Number of Cards: {cards ? cards.length : 0}</p>
      <div className="card-footer border d-flex justify-content-between">
        <div className="d-flex">
          <StudyDeckFlipButton />
          <StudyDeckNextButton />
        </div>
      </div>
    </div>
  );
}
