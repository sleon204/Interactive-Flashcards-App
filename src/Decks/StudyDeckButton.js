import React from 'react'
import { Link } from 'react-router-dom'

export default function StudyDeckButton( { deckId }) {
  return (
    <div>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
        Study
      </Link>
    </div>
  )
}
