import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ListDecks from '../Decks/ListDecks.js';
import NotFound from '../Layout/NotFound.js';
import CreateDeck from '../Decks/CreateDeckButton.js';
import StudyDeck from '../Decks/StudyDeck.js';


export default function Home() {


	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Link to="/decks/new" className="btn btn-secondary">
						<CreateDeck />
					</Link>
					<ListDecks />
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
