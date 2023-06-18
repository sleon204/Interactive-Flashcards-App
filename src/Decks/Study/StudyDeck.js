import React, { useState, useEffect } from 'react';
import StudyDeckLengthCheck from './StudyDeckLengthCheck';
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
				console.log(response);
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

	return (
		<div>
			<StudyDeckLengthCheck deck={deck} />
		</div>
	);
}
