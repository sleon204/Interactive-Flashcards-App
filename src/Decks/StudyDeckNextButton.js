import React from 'react'
import { Link } from 'react-router-dom';

export default function StudyDeckNextButton({ onNext }) {
  return (
    <Link to="#" className="btn btn-primary" onClick={onNext}>
      Next
    </Link>
  )
}
