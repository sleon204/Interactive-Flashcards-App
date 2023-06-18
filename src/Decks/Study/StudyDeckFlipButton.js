import React from 'react';

export default function StudyDeckFlipButton({ onFlip }) {
  return (
    <button className="btn btn-secondary" onClick={onFlip}>
      Flip
    </button>
  );
}
