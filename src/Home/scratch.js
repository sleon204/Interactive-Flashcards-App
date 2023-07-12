import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './Layout/NotFound';
import Home from './Home';
import Deck from './Deck';
import NewDeck from './NewDeck';
import EditDeck from './EditDeck';
import NewCard from './NewCard';
import EditCard from './EditCard';
import Study from './Study';

function App() {
	return (
		<Switch>
			<Route path="/">
				<Home />
			</Route>
			<Route path="/decks/new">
				<NewDeck />
			</Route>
			<Route path="/decks/:deckId/edit">
				<EditDeck />
			</Route>
			<Route path="/decks/:deckId/cards/new">
				<NewCard />
			</Route>
			<Route path="/decks/:deckId/cards/:cardId/edit">
				<EditCard />
			</Route>
			<Route path="/decks/:deckId/study">
				<Study />
			</Route>
			<Route path="/decks/:deckId">
				<Deck />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default App;
