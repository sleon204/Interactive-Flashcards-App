import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ListDeleteDeckButton() {
  const { deckId } = useParams();
  return (
    <div>
      <Link to={`/decks/${deckId}/delete`} className="btn btn-danger">
        Delete Deck
      </Link>
    </div>
  )
}
