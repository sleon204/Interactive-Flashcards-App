import React from 'react';

function CardForm({ front, back, handleFrontChange, handleBackChange }) {
  return (
    <form>
      <div className="d-flex">
        <div className="card d-flex flex-column w-50">
          <div className="card-header">
            <label htmlFor="front">
              <h4>Front</h4>
            </label>
          </div>
          <textarea
            id="front"
            name="front"
            onChange={handleFrontChange}
            value={front}
          />
        </div>
        <div className="card d-flex flex-column w-50">
          <div className="card-header">
            <label htmlFor="back">
              {' '}
              <h4>Back</h4>
            </label>
          </div>
          <textarea
            id="back"
            name="back"
            onChange={handleBackChange}
            value={back}
          />
        </div>
      </div>
    </form>
  );
}

export default CardForm;
