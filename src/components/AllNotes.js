import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Loading from "./Loading";
import NotesItems from "./NotesItems";
import noNotes from "./../Image/Box-Notes.png";
import "./AllNotes.css";
import AlertMessage from "./AlertMessage";
import "./AlertMessage.css";
import crossSymbol from "../Image/cross.svg";
import tickSymbol from "../Image/tick.svg";

export default function AllNotes() {
  let { auth_Token, notes, fetchAllNotes, updateNote, removeNote } =
    useContext(noteContext);
  let [allNotes, setAllNotes] = useState([...notes]);
  let originalNotes = [...notes];
  let [isLoading, setIsLoading] = useState(true);
  var [note, setNote] = useState({ title: "", description: "", tag: "" });
  let [toastVisibilty, setToastVisibilty] = useState(false);
  let [searchText, setSearchText] = useState("");
  let [alertMessage, setAlertMessage] = useState({
    mess: "",
    color: "success",
  });
  var [id, setID] = useState("");

  useEffect(() => {
    if (auth_Token !== "") {
      fetchAllNotes();
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAllNotes(notes);
  }, [notes]);

  const saveChanges = () => {
    updateNote(note, id);
    setAlertMessage({ ...alertMessage, mess: "Note updated successfully" });
    setToastVisibilty(true);
    makeToastInvisible();
  };

  const getData = (note, id) => {
    setNote(note);
    setID(id);
  };

  const deleteNote = () => {
    setAlertMessage({ ...alertMessage, mess: "Note deleted successfully" });
    removeNote(id);
    setToastVisibilty(true);
    makeToastInvisible();
  };

  const setValue = (e) => {
    let updatedObj = { ...note, [e.target.id]: e.target.value };
    setNote(updatedObj);
  };

  const makeToastInvisible = () => {
    setTimeout(() => {
      setToastVisibilty(false);
    }, 1500);
  };

  const filter = (e) => {
    setSearchText(e.target.value);
    let filteredData = originalNotes.filter(
      (note) =>
        note.tag.includes(e.target.value) || note.title.includes(e.target.value)
    );
    setAllNotes(filteredData);
  };

  return (
    <>
      {toastVisibilty && (
        <div className="alert-message">
          <AlertMessage alertMessage={alertMessage} />
        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Your Note-
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="note-add-form">
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label required">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={setValue}
                    value={note.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="col-form-label">
                    Tag:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    onChange={setValue}
                    value={note.tag}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="col-form-label required"
                  >
                    Description:
                  </label>
                  <textarea
                    value={note.description}
                    onChange={setValue}
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={note.description.length < 5 || note.title.length < 3}
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={saveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="confirmBox"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered confirm-box">
          <div className="modal-content alert-box confirm-box-content">
            <span className="fw-semibold fs-5 mx-3 my-2 alert-danger">
              Are you sure ?
            </span>
            <div className="modal-body d-flex justify-content-end pt-0">
              <img
                src={crossSymbol}
                alt="cross"
                className="cross-box"
                data-bs-dismiss="modal"
              />
              <img
                src={tickSymbol}
                alt="tick"
                className="check-box"
                data-bs-dismiss="modal"
                onClick={deleteNote}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" />
      <div className="mx-5">
        <div className="d-flex justify-content-between">
          <span className="fw-bold fs-3 ml-1">Your Notes </span>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search By Tag and Description"
              aria-label="Search"
              onChange={filter}
              value={searchText}
            />
          </form>
        </div>
        {isLoading && (
          <Loading
            heightOfPage="10rem"
            heightOfSpinner="1.5rem"
            widthOfSpinner="1.5rem"
          />
        )}
        {!isLoading && (
          <div
            className="row m-0 all-notes"
            style={{ width: "100%", paddingLeft: "0px" }}
          >
            {allNotes.map((note) => {
              return (
                <div
                  key={note._id}
                  className="col-sm-6 col-md-4 col-lg-3 col-xlg-3"
                >
                  <NotesItems note={note} getData={getData} />
                </div>
              );
            })}

            {allNotes.length === 0 && (
              <div className="image-container">
                <img src={noNotes} alt="no notes found" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
