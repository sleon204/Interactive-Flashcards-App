import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function StudyNotEnoughCardsAddButton({ deckId }) {
	return (
		<div>
			<Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary m-1">
				Add Card
			</Link>
		</div>
	);
}
