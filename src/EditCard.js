import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { readCard, updateCard, readDeck } from './utils/api/index';

function EditCard() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [deckName, setDeckName] = useState('');
  const history = useHistory();
  const { deckId, cardId } = useParams();

  useEffect(() => {
    const loadCardAndDeck = async () => {
      const cardToEdit = await readCard(cardId);
      setFront(cardToEdit.front);
      setBack(cardToEdit.back);

      const deck = await readDeck(deckId);
      setDeckName(deck.name);
    };

    loadCardAndDeck();
  }, [cardId, deckId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardToUpdate = { id: cardId, front, back, deckId: Number(deckId) };
    await updateCard(cardToUpdate);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div className="text-center">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <div className="card ">
        <div className="card-header">
          <h3>{deckName}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="card w-50">
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

            <div className="card w-50">
              <div className="card-header">
                <label htmlFor="back">
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
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCard;
