import React from 'react'
import { Link } from 'react-router-dom'


export default function CreateDeck() {
  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary">
        Create Deck
      </Link>
    </div>
  )
}
