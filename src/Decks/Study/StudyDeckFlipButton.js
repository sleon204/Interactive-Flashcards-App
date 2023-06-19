import React from 'react';

export default function StudyDeckFlipButton({ onFlip }) {
  return (
    <button className="btn btn-secondary m-1" onClick={onFlip}>
      Flip
    </button>
  );
}
