import React from 'react';
import Header from './Header';
import Home from '../Home/Home';

function Layout() {
	return (
		<>
			<Header />
			<div className="container">
				{/* TODO: Implement the screen starting here */}
				<Home />
			</div>
		</>
	);
}

export default Layout;
