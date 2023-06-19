import React from 'react';
import { Link } from 'react-router-dom';

export default function StudyNotEnoughCardsAddButton() {
	return (
		<div>
			<Link type="button" className="btn btn-primary m-1">
				Add Cards
			</Link>
		</div>
	);
}
