import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewDeckButton() {
  const { deckId } = useParams()
  return (
    <div>
      <Link to={`/decks/${deckId}`} className="btn btn-secondary">
        View Deck
      </Link>
    </div>
  )
}
