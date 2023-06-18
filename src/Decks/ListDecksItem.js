import React from 'react';
import ViewDeckButton from './ViewDeckButton';
import StudyDeckButton from './StudyDeckButton';
import DeleteDeckButton from './DeleteDeckButton';


export default function ListDecksItem({ deck }) {
	return (
		<div className="card">
			<div className="card-header">
				<div className="float-left">
					<p>{deck.name}</p>
				</div>
				<div className="float-right">
					<p>{deck.cards.length} Cards</p>
				</div>
			</div>
			<div className="card-body">
				<p>{deck.description}</p>
			</div>
			<div className="card-footer border d-flex justify-content-between">
				<div className="d-flex">
					<ViewDeckButton deckId={deck.id} />
					<StudyDeckButton deckId={deck.id} />
				</div>
				<div>
					<DeleteDeckButton deckId={deck.id} />
				</div>
			</div>
		</div>
	);
}
