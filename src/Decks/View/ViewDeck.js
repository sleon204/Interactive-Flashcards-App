import React from 'react';
import { useParams } from 'react-router-dom';
import ViewDeckItem from './ViewDeckItem';

export default function ViewDeck() {
	const { deckId } = useParams();
	return (
		<div>
			<ViewDeckItem deckId={deckId} />
		</div>
	);
}
