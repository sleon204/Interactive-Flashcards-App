import React from 'react';
import { Route, Switch } from 'react-router-dom';
//layout
import Breadcrumbs from '../Layout/BreadCrumbs';
import NotFound from '../Layout/NotFound';
//decks
import CreateDeck from '../Decks/CreateDeck/CreateDeck';
import CreateDeckButton from '../Decks/CreateDeck/CreateDeckButton';
import ListDecks from '../Decks/List/ListDecks';
import StudyDeck from '../Decks/Study/StudyDeck';
import ViewDeck from '../Decks/View/ViewDeck';

export default function Home() {
	return (
		<div>
			<Breadcrumbs />
			<Switch>
				<Route exact path="/">
					<CreateDeckButton />
					<ListDecks />
				</Route>
				<Route path="/decks/new">
					<CreateDeck />
				</Route>
				<Route path={`/decks/:deckId`}>
					<ViewDeck />
				</Route>
				<Route path={`/decks/:deckId/study`}>
					<StudyDeck />
				</Route>

				<Route>
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
}
