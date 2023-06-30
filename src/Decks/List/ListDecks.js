import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { listDecks, deleteDeck } from '../../utils/api/index';

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

	const history = useHistory();

	const handleDelete = async (deckId) => {
		if (
			window.confirm(
				'Are you sure you want to delete this deck? This cannot be undone.'
			)
		) {
			await deleteDeck(deckId);

			const updatedDecks = decks.filter((deck) => deck.id !== deckId);
			setDecks(updatedDecks);

			history.push('/');
		}
	};

	return (
		<div className="my-4">
			{decks
				? decks.map((deck) => (
						<div className="card" key={deck.id}>
							<div className="card-header">
								<div className="text-center">
									<h2>{deck.name}</h2>
								</div>
								<div className="text-center">
									<p>{`${deck.cards ? deck.cards.length : 0} Cards`}</p>
								</div>
							</div>
							<div className="card-body text-center p-5">
								<p>{deck.description}</p>
							</div>
							<div className="card-footer border d-flex justify-content-between">
								<div className="d-flex">
									<div>
										<Link to={`/decks/${deck.id}`} className="btn btn-secondary m-1">
											View Deck
										</Link>
									</div>
									<div>
										<Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-1">
											Study
										</Link>
									</div>
								</div>
								<div>
									<button onClick={() => handleDelete(deck.id)} className="btn btn-danger m-1">
										Delete Deck
									</button>
								</div>
							</div>
						</div>
				  ))
				: 'Loading decks...'}
		</div>
	);
}
