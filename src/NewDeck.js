import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "./utils/api/index";

function NewDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = { name, description };
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="card-header d-flex flex-column">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleNameChange}
              value={name}
            />
          </div>
          <div className="card-body d-flex flex-column">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleDescriptionChange}
              value={description}
            />
          </div>
          <div className="card-footer">
            <button
              className="btn btn-secondary ml-1"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-primary ml-1" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDeck;
