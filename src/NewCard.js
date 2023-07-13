import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { readDeck, createCard } from './utils/api/index';

function NewCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckFromAPI = await readDeck(deckId);
        setDeck(deckFromAPI);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = { front, back, deckId: deck.id };
    await createCard(deck.id, newCard);
    history.push(`/decks/${deck.id}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deck.id}`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>Add Card</h1>

      <div className="card">
        <div className="card-header">
          <h3>{deck.name}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="card d-flex flex-column w-50">
              <div className="card-header">
                <label htmlFor="front">
                  <h4>Front</h4>
                </label>
              </div>
              <textarea
                id="front"
                name="front"
                onChange={handleFrontChange}
                value={front}
              />
            </div>
            <div className="card d-flex flex-column w-50">
              <div className="card-header">
                <label htmlFor="back">
                  {' '}
                  <h4>Back</h4>
                </label>
              </div>
              <textarea
                id="back"
                name="back"
                onChange={handleBackChange}
                value={back}
              />
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCancel}
            >
              Done
            </button>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCard;
