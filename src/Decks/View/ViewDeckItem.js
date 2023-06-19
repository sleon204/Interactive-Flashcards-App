import React from 'react';
import ViewDeckEditButton from './ViewDeckEditButton';
import ListStudyDeckButton from '../List/ListStudyDeckButton';
import StudyNotEnoughCardsAddButton from '../Study/StudyNotEnoughCardsAddButton';
import ListDeleteDeckButton from '../List/ListDeleteDeckButton';


export default function ViewDeckItem({ deck }) {
	return (
		<div className="card">
			<div className="card-header">
				<div className="float-left">
					<p>{deck.name}</p>
				</div>
			</div>
			<div className="card-body">
				<p>{deck.description}</p>
			</div>
			<div className="card-footer border d-flex justify-content-between">
				<div className="d-flex">
					<ViewDeckEditButton deckId={deck.id} />
					<ListStudyDeckButton deckId={deck.id} />
          <StudyNotEnoughCardsAddButton deckId={deck.id} />
				</div>
				<div>
					<ListDeleteDeckButton deckId={deck.id} />
				</div>
			</div>
		</div>
	);
}
