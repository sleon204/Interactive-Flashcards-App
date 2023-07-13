import React, { useEffect, useState } from 'react';
import { readDeck, deleteDeck, deleteCard } from './utils/api/index';
import { useParams, useHistory, Link } from 'react-router-dom';

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckFromAPI = await readDeck(deckId);
        setDeck(deckFromAPI);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [deckId]);

  const handleEditDeck = () => {
    // Implement the logic to navigate to the edit deck page
    history.push(`/decks/${deckId}/edit`);
  };

  const handleStudyDeck = () => {
    // Implement the logic to navigate to the study deck page
    history.push(`/decks/${deckId}/study`);
  };

  const handleAddCards = () => {
    // Implement the logic to navigate to the add cards page
    history.push(`/decks/${deckId}/cards/new`);
  };

  const handleDeleteDeck = async () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await deleteDeck(deckId);
        // Implement any necessary cleanup or redirection after deleting the deck
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditCard = (cardId) => {
    // Implement the logic to navigate to the edit card page
    history.push(`/decks/${deckId}/cards/${cardId}/edit`);
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard(cardId);
        // Update the deck state by removing the deleted card
        setDeck((prevDeck) => ({
          ...prevDeck,
          cards: prevDeck.cards.filter((card) => card.id !== cardId),
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!deck) {
    return <div>Failed to load deck.</div>;
  }

  return (
    <div className="text-center">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card">
        <h2 className="card-header">{deck.name}</h2>
        <p className="card-body">{deck.description}</p>
        <div className="card-footer d-flex justify-content-between">
          <div>
            <button className="btn btn-primary ml-1" onClick={handleEditDeck}>
              Edit Deck
            </button>
            <button className="btn btn-primary ml-1" onClick={handleStudyDeck}>
              Study Deck
            </button>
            <button className="btn btn-primary ml-1" onClick={handleAddCards}>
              Add Cards
            </button>
          </div>
          <div>
            <button className="btn btn-danger ml-1" onClick={handleDeleteDeck}>
              Delete Deck
            </button>
          </div>
        </div>
      </div>
      {deck.cards.map((card) => (
        <div className="card" key={card.id}>
          <div className="d-flex">
            <div className="card w-50">
              <h4 className="card-header">Front</h4>
              <p className="card-body">{card.front}</p>
            </div>
            <div className="card w-50">
              <h4 className="card-header">Back</h4>
              <p className="card-body">{card.back}</p>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <div>
              <button
                className="btn btn-primary ml-1"
                onClick={() => handleEditCard(card.id)}
              >
                Edit Card
              </button>
            </div>
            <div>
              <button
                className="btn btn-danger ml-1"
                onClick={() => handleDeleteCard(card.id)}
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
