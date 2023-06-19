import React from 'react'
import { Link } from 'react-router-dom'

export default function ListStudyDeckButton( { deckId }) {
  return (
    <div>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary m-1">
        Study
      </Link>
    </div>
  )
}
