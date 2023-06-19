import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { updateDeck, readDeck } from '../../utils/api/index';

export default function EditDeck() {
	const history = useHistory();
	const { deckId } = useParams();
	const [deck, setDeck] = useState({ name: '', description: '' });

	useEffect(() => {
		const fetchDeck = async () => {
			try {
				const response = await readDeck(deckId);
				setDeck(response);
			} catch (error) {
				console.error('Error fetching deck:', error);
			}
		};

		fetchDeck();
	}, [deckId]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const updatedDeck = {
			...deck,
			name: form.name.value,
			description: form.description.value,
		};

		try {
			await updateDeck(updatedDeck);
			// Redirect to the Deck screen with the updated deck
			history.push(`/decks/${deckId}`);
		} catch (error) {
			// Handle error if needed
			console.error('Error updating deck:', error);
		}
	};

	const handleCancel = () => {
		// Redirect to the Deck screen when canceled
		history.push(`/decks/${deckId}`);
	};

	return (
		<div>
			<h2>Edit Deck</h2>
			<form onSubmit={handleSubmit}>
				<div className="card">
					<div className="card-header d-flex flex-column">
						<label htmlFor="name">Name:</label>
						<input
							className="border"
							type="text"
							id="name"
							placeholder="Deck Name"
							required
							defaultValue={deck.name}
						/>
					</div>
					<div className="card-body d-flex flex-column">
						<label htmlFor="description">Description:</label>
						<textarea
							className="border"
							id="description"
							rows="4"
							placeholder="Brief description of the deck"
							required
							defaultValue={deck.description}
						/>
					</div>
					<div className="card-footer">
						<button className='btn btn-secondary m-1' type="button" onClick={handleCancel}>
							Cancel
						</button>
						<button className='btn btn-primary m-1' type="submit">Save</button>
					</div>
				</div>
			</form>
		</div>
	);
}
