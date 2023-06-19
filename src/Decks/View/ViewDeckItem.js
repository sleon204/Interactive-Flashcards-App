import React from 'react';
import ViewDeckEditButton from './ViewDeckEditButton';
import ListStudyDeckButton from '../List/ListStudyDeckButton';
import StudyNotEnoughCardsAddButton from '../Study/StudyNotEnoughCardsAddButton';
import ListDeleteDeckButton from '../List/ListDeleteDeckButton';
import ViewDecksItemCardsList from './ViewDecksItemCardsList';


export default function ViewDeckItem({ deck }) {
	return (
		<div>
		<div className="card">
			<div className="card-header">
				<div className="text-center">
					<h2>{deck.name}</h2>
				</div>
			</div>
			<div className="card-body">
				<h5>{deck.description}</h5>
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
		<div> 
		<div className="my-4">
        {deck.cards ? deck.cards.map((card) => (
          <ViewDecksItemCardsList key={card.id} card={card} length={deck.cards.length} />
        )) : 'Loading cards...'}
      </div>

    </div>
		</div>
	);
}
