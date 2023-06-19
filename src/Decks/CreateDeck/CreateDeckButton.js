import React from 'react'
import { Link } from 'react-router-dom'


export default function CreateDeckButton() {
  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary m-1">
        Create Deck
      </Link>
    </div>
  )
}
