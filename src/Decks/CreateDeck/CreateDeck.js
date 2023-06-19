import React from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api/index';


export default function CreateDeck( {addDeck}) {
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const deck = {
			name: form.name.value,
			description: form.description.value,
		};

		try {
			const savedDeck = await createDeck(deck);
			addDeck(savedDeck);
			const deckId = savedDeck.id;
			// Redirect to the Deck screen with the newly created deck
			history.push(`/decks/${deckId}`);
		} catch (error) {
			// Handle error if needed
			console.error('Error saving deck:', error);
		}
	};

	const handleCancel = () => {
		// Redirect to the Home screen when canceled
		history.push('/');
	};

	return (
		<div>
			<h2> Create Deck</h2>
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
						/>
					</div>
					<div className="card-footer">
						<button className='btn btn-secondary' type="button" onClick={handleCancel}>
							Cancel
						</button>
						<button className='btn btn-primary' type="submit">Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
}
