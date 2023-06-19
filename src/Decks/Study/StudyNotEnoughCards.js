import React from 'react';
import StudyNotEnoughCardsAddButton from './StudyNotEnoughCardsAddButton';

export default function StudyNotEnoughCards({ deck }) {
	return (
		<div className='card'>
      <div className='card-header'>
			<h1>{deck.name}: Study</h1>
      </div>
      <div className='card-body text-center'>
			<div>
        <h2>Not Enough Cards</h2>
        </div>
			<div>
        <h5>You need at least 3 cards to study. There are 2 cards in this deck.</h5>
        </div>
        </div>
			<div className='card-footer'>
				<StudyNotEnoughCardsAddButton />
			</div>
		</div>
	);
}
