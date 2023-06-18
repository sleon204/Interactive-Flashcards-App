import React, { useState, useEffect } from 'react';
import ListDecksItem from './ListDecksItem';
import { listDecks } from '../../utils/api/index';


export default function ListDecks() {
	const [decks, setDecks] = useState([]);


	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		async function fetchDecks() {
			try {
				const response = await listDecks(signal);
				setDecks(response);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Aborted');
				} else {
					throw error;
				}
			}
		}
		fetchDecks();
		return () => {
			abortController.abort();
		};
	}, []);

  return (
    <div className= " my-4">
      {decks.map((deck, index) => (
        <ListDecksItem key={deck.id} deck={deck} />

      ))}
    </div>
  );
}
