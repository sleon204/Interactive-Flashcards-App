import React from 'react';
import BreadCrumbs from '../Layout/BreadCrumbs';
import { useParams } from 'react-router-dom';
import ViewDeckItem from './ViewDeckItem';

export default function ViewDeck() {
	const { deckId } = useParams();
	return (
		<div>
			<div>
				<BreadCrumbs />
			</div>
			<div>
				<ViewDeckItem deckId={deckId} />
				</div>
		</div>
	);
}
