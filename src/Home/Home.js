import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ListDecks from '../Decks/List/ListDecks';
import NotFound from '../Layout/NotFound';
import CreateDeckButton from './CreateDeckButton';
import StudyDeck from '../Decks/Study/StudyDeck';
import ViewDeck from '../Decks/View/ViewDeck';
import Breadcrumbs from '../Layout/BreadCrumbs';

export default function Home() {
	return (
		<div>
			<Breadcrumbs />
			<Switch>
				<Route exact path="/">
					<Link to="/decks/new" className="btn btn-secondary">
						<CreateDeckButton />
					</Link>
					<ListDecks />
				</Route>
				<Route path={`/decks/:deckId/study`}>
					<StudyDeck />
				</Route>
				<Route path={`/decks/deckId`}>
					<ViewDeck />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
}
