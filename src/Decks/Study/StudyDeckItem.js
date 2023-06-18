import React, { useState } from 'react';
import StudyDeckFlipButton from './StudyDeckFlipButton';
import StudyDeckNextButton from './StudyDeckNextButton';
import { useHistory } from 'react-router-dom';

export default function StudyDeckItem({ deck }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const { name, cards } = deck;
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
				history.push('/'); // Redirect to the home screen
			}
		}
		setFlipped(false); // Reset the flip status when moving to the next card
	};

	const handleFlip = () => {
		setFlipped(!flipped);
	};

	return (
		<div className="card">
			<div className="card-header">
				<div className="float-left">
					<h2>{name}: Study</h2>
				</div>
			</div>
			<div className="card-body">
				<div>
					<h6>
						Card #{currentIndex + 1} of {cards ? cards.length : 0}{' '}
						<span className="text-muted">
							{' '}
							{flipped ? '(Back)' : '(Front)'}{' '}
						</span>
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
					<StudyDeckFlipButton onFlip={handleFlip} />
					{currentCard ? (
						flipped ? (
							<StudyDeckNextButton onNext={handleNext} />
						) : null
					) : null}
				</div>
			</div>
		</div>
	);
}
