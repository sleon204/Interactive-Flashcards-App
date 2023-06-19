import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { listDecks } from '../utils/api/index';
import Breadcrumbs from '../Layout/BreadCrumbs';
import CreateDeckButton from '../Decks/CreateDeck/CreateDeckButton';
import ListDecksItem from '../Decks/List/ListDecksItem';
import CreateDeck from '../Decks/CreateDeck/CreateDeck';
import StudyDeck from '../Decks/Study/StudyDeck';
import ViewDeck from '../Decks/View/ViewDeck';
import NotFound from '../Layout/NotFound';

export default function Home() {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		async function fetchDecks() {
			try {
				const response = await listDecks(signal);
				setDecks(response);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Aborted');
				} else {
					throw error;
				}
			}
		}
		fetchDecks();
		return () => {
			abortController.abort();
		};
	}, []);

	function addDeck(deck) {
		setDecks([...decks, deck]);
	}

	return (
		<div>
			<Breadcrumbs decks={decks} setDecks={setDecks} />
			<Switch>
				<Route exact path="/">
					<CreateDeckButton />
					<ListDecksItem decks={decks} setDecks={setDecks} />
				</Route>
				<Route path="/decks/new">
				<CreateDeck addDeck={addDeck} />
				</Route>
				<Route path={`/decks/:deckId/study`}>
					<StudyDeck decks={decks} setDecks={setDecks}/>
				</Route>
				<Route path={`/decks/:deckId`}>
					<ViewDeck decks={decks} setDecks={setDecks}/>
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
}
