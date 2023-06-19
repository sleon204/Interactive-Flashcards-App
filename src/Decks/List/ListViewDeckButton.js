import React from 'react'
import { Link } from 'react-router-dom'

export default function ListViewDeckButton({ deckId }) {
  return (
    <div>
      <Link to={`/decks/${deckId}`} className="btn btn-secondary m-1">
        View Deck
      </Link>
    </div>
  )
}
