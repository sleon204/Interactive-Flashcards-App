import React from 'react';
import { Link } from 'react-router-dom';

export default function BreadCrumbs() {
	return (
		<nav label="breadcrumb">
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<Link to="/">Home</Link>
				</li>
				{/* <li className="breadcrumb-item active">current</li> */}
			</ol>
		</nav>
	);
}
