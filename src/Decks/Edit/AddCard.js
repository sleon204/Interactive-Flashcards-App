import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'; // Added useParams import
import { createCard } from '../../utils/api/index';

export default function AddCard() {
	const { deckId } = useParams(); // Added useParams call
	const [front, setFront] = useState('');
	const [back, setBack] = useState('');
	const history = useHistory();

	const handleFrontChange = (event) => {
		setFront(event.target.value);
	};

	const handleBackChange = (event) => {
		setBack(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const card = {
			front: front,
			back: back,
		};

		try {
			const abortController = new AbortController();
			const signal = abortController.signal;
			await createCard(deckId, card, signal);
			history.push(`/decks/${deckId}`);
		} catch (error) {
			console.error('Error adding card:', error);
		}
	};

	const handleDone = () => {
		// Redirect to the Deck screen when canceled
		history.push(`/decks/${deckId}`);
	};


	return (
		<div className="card">
			<div className="card-header">
				<h3>Add Card</h3>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="card-body d-flex">
					<div className="card w-50">
						<h4 className="card-header text-center">Front</h4>
						<textarea
							className="card-body text-center p-5"
							value={front}
							onChange={handleFrontChange}
							placeholder="Enter front text"
							required
						/>
					</div>
					<div className="card w-50">
						<h4 className="card-header text-center">Back</h4>
						<textarea
							className="card-body text-center p-5"
							value={back}
							onChange={handleBackChange}
							placeholder="Enter back text"
							required
						/>
					</div>
				</div>
				<div className="card-footer border d-flex justify-content-end">
					<button
						className="btn btn-secondary m-1"
						type="button"
						onClick={handleDone}
					>
						Done
					</button>
					<button type="submit" className="btn btn-primary m-1">
						Save Card
					</button>
				</div>
			</form>
		</div>
	);
}
