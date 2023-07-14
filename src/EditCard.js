import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { readCard, updateCard,  } from './utils/api/index';
import CardForm from './CardForm';

function EditCard() {
  const [card, setCard] = useState(null);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const history = useHistory();
  const { deckId, cardId } = useParams();

  useEffect(() => {
    const loadCardAndDeck = async () => {
      try {
        const cardFromAPI = await readCard(cardId);
        setCard(cardFromAPI);
        setFront(cardFromAPI.front);
        setBack(cardFromAPI.back);
      } catch (error) {
        console.error(error);
      }
    };

    loadCardAndDeck();
  }, [cardId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCard = { ...card, front, back };
    await updateCard(updatedCard);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!card) {
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
            <Link to={`/decks/${deckId}`}>{card.deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <div className="card">
        <div className="card-header">
          <h3>{card.deckName}</h3>
        </div>
        <CardForm
          front={front}
          back={back}
          handleFrontChange={handleFrontChange}
          handleBackChange={handleBackChange}
        />
        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
