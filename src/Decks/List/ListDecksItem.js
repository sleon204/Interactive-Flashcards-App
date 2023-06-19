import React from 'react';
import ListViewDeckButton from './ListViewDeckButton';
import ListStudyDeckButton from './ListStudyDeckButton';
import ListDeleteDeckButton from './ListDeleteDeckButton';

export default function ListDecksItem({ decks, setDecks }) {
	return (
		<div className="my-4">
			{decks
				? decks.map((deck, index) => (
						<div className="card" key={deck.id}>
							<div className="card-header">
								<div className="text-center">
									<h2>{deck.name}</h2>
								</div>
								<div className="text-center">
									<div className="text-center">
										<p>{`${deck.cards ? deck.cards.length : 0} Cards`}</p>
									</div>
								</div>
							</div>
							<div className="card-body text-center p-5">
								<p>{deck.description}</p>
							</div>
							<div className="card-footer border d-flex justify-content-between">
								<div className="d-flex">
									<ListViewDeckButton
										deckId={deck.id}
										decks={decks}
										setDecks={setDecks}
									/>
									<ListStudyDeckButton
										deckId={deck.id}
										decks={decks}
										setDecks={setDecks}
									/>
								</div>
								<div>
									<ListDeleteDeckButton
										deckId={deck.id}
										decks={decks}
										setDecks={setDecks}
									/>
								</div>
							</div>
						</div>
				  ))
				: 'Loading decks...'}
		</div>
	);
}
