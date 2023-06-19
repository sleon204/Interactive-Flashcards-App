import React from 'react'
import ViewDecksItemCardsListDeleteButton from './ViewDecksItemCardsListDeleteButton';
import ViewDecksItemCardsListEditButton from './ViewDecksItemCardsListEditButton';

export default function ViewDecksItemCardsList( {card, length} ) {
  return (
		<div className="card">
			<div className="card-header">
				<div className="text-center">
					<h3>Card #{card.id} of {length}</h3>
				</div>
			</div>
			<div className='d-flex'>
			<div className="card w-50">
				<h4 className='card-header text-center'>Front</h4>
				<div className='card-body text-center p-5'>
				<h5>{card.front}</h5>
				</div>
			</div>
      <div className="card w-50">
			<h4 className='card-header text-center'>Back</h4>
			<div className='card-body text-center p-5'>
				<h5>{card.back}</h5>
				</div>
			</div>
			</div>
			<div className="card-footer border d-flex justify-content-end">
				<div>
        <ViewDecksItemCardsListEditButton cardId={card.id} />

				</div>
				<div>
					<ViewDecksItemCardsListDeleteButton cardId={card.id} />
				</div>
			</div>
		</div>
	);
}

