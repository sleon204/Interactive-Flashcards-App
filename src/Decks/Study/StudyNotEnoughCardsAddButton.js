import React from 'react';
import { Link } from 'react-router-dom';

export default function StudyNotEnoughCardsAddButton() {
	return (
		<div>
			<Link type="button" className="btn btn-primary">
				Add Cards
			</Link>
		</div>
	);
}
