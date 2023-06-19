import React from 'react';
import { Link } from 'react-router-dom';

export default function StudyDeckFlipButton({ onFlip }) {
  return (
    <Link to="#" className="btn btn-secondary m-1" onClick={onFlip}>
      Flip
    </Link>
  );
}