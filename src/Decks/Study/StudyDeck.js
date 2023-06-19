import React, { useState, useEffect } from 'react';
import StudyDeckItem from './StudyDeckItem';
import StudyNotEnoughCards from './StudyNotEnoughCards';
import { readDeck } from '../../utils/api/index';
import { useParams } from 'react-router-dom';

export default function StudyDeck() {
	const [deck, setDeck] = useState({});

	const { deckId } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		async function fetchDeck() {
			try {
				const response = await readDeck(deckId, signal);
				setDeck(response);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Aborted');
				} else {
					throw error;
				}
			}
		}
		fetchDeck();
		return () => {
			abortController.abort();
		};
	}, [deckId]);

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
