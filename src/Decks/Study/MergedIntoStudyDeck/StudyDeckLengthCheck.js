import React from 'react';
import StudyDeckItem from './StudyDeckItem';
import StudyNotEnoughCards from './StudyNotEnoughCards';

export default function StudyDeckLengthCheck({ deck }) {
	if (deck && deck.cards && deck.cards.length > 3) {
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
