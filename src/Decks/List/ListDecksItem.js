import React from 'react';
import ListViewDeckButton from './ListViewDeckButton';
import ListStudyDeckButton from './ListStudyDeckButton';
import ListDeleteDeckButton from './ListDeleteDeckButton';


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
					<ListViewDeckButton deckId={deck.id} />
					<ListStudyDeckButton deckId={deck.id} />
				</div>
				<div>
					<ListDeleteDeckButton deckId={deck.id} />
				</div>
			</div>
		</div>
	);
}
