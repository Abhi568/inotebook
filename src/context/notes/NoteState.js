import NoteContext from "./noteContext";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function NoteState(props) {

  useEffect(()=>{
      settingAuthToken()
      // eslint-disable-next-line
  },[])

  const state = {
    host: "http://localhost:5000",
    notes: [],
  };
  
  let [auth_Token, setAuthToken] = useState("")


  function settingAuthToken() {
    if (localStorage.getItem("auth-token")){
      let token  = JSON.parse(localStorage.getItem("auth-token")).authToken
      setAuthToken(token)
        }
        else{
          setAuthToken("")
        }
  }

  function fetchAllNotes() {
    fetch(`${state.host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          auth_Token
      },
    })
      .then((res) => res.json())
      .then((allNotes) => {
        setNotes(allNotes);
      })
      .catch((error) =>
        console.log(`Error occured while fetching the notes ${error}`)
      );
  }

  function addItems(obj) {
    fetch(`${state.host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":
        auth_Token
      },
      body: JSON.stringify(obj),
    })
    .then(res=>res.json())
      .then((res) => {
        setNotes(notes.concat(res));
      })
      .catch((err) => console.log(`Error occured while adding Note ${err}`));
  }

  function removeNote(id) {
    fetch(`${state.host}/api/notes/deletenotes/${id}`, {
      method: "Delete",
      headers: {
        "auth-token":
        auth_Token
      },
    })
      .then((res) => {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      })
      .catch((err) =>
        console.log(`Error occured while deleting the Note with id ${id}`)
      );

  }

  const updateNote = (obj,id) => {
    fetch(`${state.host}/api/notes/updatenotes/${id}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json",
            "auth-token":auth_Token
        },
        body: JSON.stringify(obj),
    })
    .then(res=>res.json())
    .then(res => {
        fetchAllNotes()
      })
    .catch((err) => console.log(`Error occurred while updting the note with id`));
  }
  let [notes, setNotes] = useState(state.notes);
 
  // let [length, setLength] = useState(0);
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addItems, removeNote, fetchAllNotes, updateNote, auth_Token,settingAuthToken}}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
