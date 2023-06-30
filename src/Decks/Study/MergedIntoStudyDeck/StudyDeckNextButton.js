import React from 'react'
import { Link } from 'react-router-dom';

export default function StudyDeckNextButton({ onNext }) {
  return (
    <Link to="#" className="btn btn-primary m-1" onClick={onNext}>
      Next
    </Link>
  )
}
