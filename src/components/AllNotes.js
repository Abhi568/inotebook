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
  let [isLoading, setIsLoading] = useState(true);
  var [note, setNote] = useState({ title: "", description: "", tag: "" });
  let [toastVisibilty, setToastVisibilty] = useState(false);
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

  const saveChanges = () => {
    updateNote(note, id);
    setAlertMessage({...alertMessage,mess:"Note updated successfully"})
    setToastVisibilty(true);
    makeToastInvisible();
  };

  const getData = (note, id) => {
    setNote(note);
    setID(id);
  };

  const deleteNote = () => {
    setAlertMessage({...alertMessage,mess:"Note deleted successfully"})
    // console.log('id need to be deleted',id)
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
      // setAlertMessage({ mess: "asasdsdas", color: "success" });
    }, 1500);
  };

  return (
    <>
      {toastVisibilty && (
        <div className="alert-message">
          <AlertMessage alertMessage={alertMessage} />
        </div>
      )}
      {isLoading && (
        <Loading
          heightOfPage="10rem"
          heightOfSpinner="1.5rem"
          widthOfSpinner="1.5rem"
        />
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
                  <label htmlFor="title" className="col-form-label">
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
                  <label htmlFor="description" className="col-form-label">
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
      <hr className="my-5" />
      {!isLoading && (
        <>
          <div className="mx-5">
            <h1 className="fw-bold fs-3 ">Your Notes </h1>
            <div
              className="row m-0 all-notes"
              style={{ width: "100%", paddingLeft: "0px" }}
            >
              {notes.map((note) => {
                return (
                  <div
                    key={note._id}
                    className="col-sm-6 col-md-4 col-lg-3 col-xlg-3"
                  >
                    <NotesItems
                      note={note}
                      getData={getData}
                    />
                  </div>
                );
              })}
            </div>
            {notes.length === 0 && (
              <div className="container">
                <img src={noNotes} alt="no notes found" />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
