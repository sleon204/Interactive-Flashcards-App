import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ListDeleteDeckButton() {
  const { deckId } = useParams();
  return (
    <div>
      <Link to={`/decks/${deckId}/delete`} className="btn btn-danger m-1">
        Delete Deck
      </Link>
    </div>
  )
}
