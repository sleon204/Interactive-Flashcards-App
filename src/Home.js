import React, { useEffect, useState } from 'react';
import { listDecks } from './utils/api/index';
import DeckList from './DeckList';
import { Link } from 'react-router-dom';

function Home() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const decksFromApi = await listDecks();
        setDecks(decksFromApi);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-center'>
      <Link to="/decks/new" className="btn btn-secondary mb-4">Create Deck</Link>
      <DeckList decks={decks} />
    </div>
  );
}

export default Home;
