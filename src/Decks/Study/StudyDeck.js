import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api/index';

function StudyDeckItem({ deck }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const { cards } = deck;
	const currentCard = cards && cards.length > 0 ? cards[currentIndex] : null;
	const history = useHistory();

	const handleNext = () => {
		if (currentIndex < cards.length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			const shouldRestart = window.confirm(
				'You have reached the end of the deck. Do you want to restart?'
			);
			if (shouldRestart) {
				setCurrentIndex(0);
			} else {
				history.push('/');
			}
		}
		setFlipped(false);
	};

	const handleFlip = () => {
		setFlipped(!flipped);
	};

	return (
		<div className="card">
			<div className="card-header">
				<div className="float-left">
					<h2>{`${deck.name}: Study`}</h2>
				</div>
			</div>
			<div className="card-body">
				<div>
					<h6>
						Card #{currentIndex + 1} of {cards ? cards.length : 0}
						<span className="text-muted">{flipped ? '(Back)' : '(Front)'}</span>
					</h6>
				</div>
				<div className="d-flex justify-content-center">
					<h5>
						{currentCard
							? flipped
								? currentCard.back
								: currentCard.front
							: ''}
					</h5>
				</div>
			</div>
			<div className="card-footer border d-flex justify-content-between">
				<div className="d-flex">
					<button className="btn btn-secondary m-1" onClick={handleFlip}>
						Flip
					</button>
					{currentCard ? (
						flipped ? (
							<button className="btn btn-primary m-1" onClick={handleNext}>
								Next
							</button>
						) : null
					) : null}
				</div>
			</div>
		</div>
	);
}

function StudyNotEnoughCards({ deck }) {
	return (
		<div className="card">
			<div className="card-header">
				<h1>{deck.name}</h1>
			</div>
			<div className="card-body text-center">
				<div>
					<h2>Not Enough Cards</h2>
				</div>
				<div>
					<h5>
						You need at least 3 cards to study. There are 2 cards in this deck.
					</h5>
				</div>
			</div>
			<div className="card-footer">
				<StudyNotEnoughCardsAddButton deckId={deck.id} />
			</div>
		</div>
	);
}

export function StudyNotEnoughCardsAddButton({ deckId }) {
	return (
		<div>
			<Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary m-1">
				Add Card
			</Link>
		</div>
	);
}

export default function StudyDeck() {
	const [deck, setDeck] = useState({});
	const [loading, setLoading] = useState(true);

	const { deckId } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		async function fetchDeck() {
			try {
				setLoading(true);
				const response = await readDeck(deckId, signal);
				setDeck(response);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Aborted');
				} else {
					throw error;
				}
			} finally {
				setLoading(false);
			}
		}
		fetchDeck();
		return () => {
			abortController.abort();
		};
	}, [deckId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (deck && deck.cards && deck.cards.length >= 3) {
		return (
			<div>
				<StudyDeckItem deck={deck} />
			</div>
		);
	} else {
		return (
			<div>
				<StudyNotEnoughCards deck={deck} />
			</div>
		);
	}
}
