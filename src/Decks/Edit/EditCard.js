import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { readDeck, readCard } from '../../utils/api/index';

export default function EditCard() {
  const location = useLocation();
  const { pathname } = location;
  const deckId = pathname.split('/')[2];
  const cardId = pathname.split('/')[4];
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      try {
        const fetchedDeck = await readDeck(deckId, signal);
        const fetchedCard = await readCard(cardId, signal);
        setDeck(fetchedDeck);
        setCard(fetchedCard);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted');
        } else {
          throw error;
        }
      } finally {
        abortController.abort();
      }
    };

    fetchData();
  }, [deckId, cardId]);

  return (
    <div>
      <h2>Edit Card</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            value={card?.front || ''}
            onChange={(e) => setCard({ ...card, front: e.target.value })}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            value={card?.back || ''}
            onChange={(e) => setCard({ ...card, back: e.target.value })}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Save
        </button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
}
