import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { readDeck, createCard } from './utils/api/index';
import CardForm from './CardForm';

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
        <CardForm
          front={front}
          back={back}
          handleFrontChange={handleFrontChange}
          handleBackChange={handleBackChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleCancelType="create"
        />
      </div>
    </div>
  );
}

export default NewCard;
