import React from 'react'
import { Link } from 'react-router-dom'

export default function ViewDeckEditButton({ deckId }) {
  return (
    <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary m-1">
      Edit
    </Link>
  )
}
