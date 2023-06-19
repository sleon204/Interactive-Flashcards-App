import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewDecksItemCardsListEditButton() {
	return (
		<div>
			<Link to="/decks/:deckId/edit" className="btn btn-secondary m-1">
				Edit Deck
			</Link>
		</div>
	);
}
