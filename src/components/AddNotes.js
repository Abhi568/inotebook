import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AlertMessage from "./AlertMessage";
import "./AddNotes.css";

export default function AddNotes() {
  let context = useContext(noteContext);
  const { addItems } = context;
  let [note, setNote] = useState({ title: "", description: "", tag: "" });
  let [toastVisibilty, setToastVisibilty] = useState(false);

  let alertMessage = {
    mess: "Note added successfully",
    color: "success",
  };

  function addItem(e) {
    e.preventDefault();
    setNote({ title: "", description: "", tag: "" });
    setToastVisibilty(true);
    addItems(note);
    makeToastInvisible();
    let form = document.getElementById("form")
    form.reset()
  }
  const setValue = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  const makeToastInvisible = () => {
    setTimeout(() => {
      setToastVisibilty(false);
    }, 1500);
  };

  return (
    <div className="add-notes  container">
      {toastVisibilty && (
        <div className="alert-message">
          <AlertMessage alertMessage={alertMessage} />
        </div>
      )}
      <span className="fw-bolder fs-2">Add Your Notes</span>
      <form onSubmit={addItem} id="form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={setValue}
            placeholder="Title"
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            onChange={setValue}
            placeholder="Tag"
            type="title"
            className="form-control"
            id="tag"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            onChange={setValue}
            style={{ height: "100px" }}
            placeholder="Description"
            type="text"
            className="form-control"
            id="description"
          />
        </div>
        <button
          type="submit"
          disabled={note.description.length < 5 || note.title.length < 3}
          className="btn btn-primary"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
