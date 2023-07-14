import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { readDeck, updateDeck } from './utils/api/index';

function EditDeck() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const deckData = await readDeck(deckId);
        setName(deckData.name);
        setDescription(deckData.description);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDeck = { id: deckId, name, description };
    await updateDeck(updatedDeck);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.goBack();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="card-header d-flex flex-column">
            <div>
              <label htmlFor="name">Name</label>
            </div>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleNameChange}
              value={name}
            />
          </div>
          <div className="card-body d-flex flex-column">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleDescriptionChange}
              value={description}
            />
          </div>
          <div className="card-footer">
            <button className="btn btn-secondary ml-1" type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary ml-1" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDeck;
