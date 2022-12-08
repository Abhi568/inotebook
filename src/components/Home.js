import React, { useEffect } from "react";
import { useState } from "react";
import AddNotes from "./AddNotes";
import AllNotes from "./AllNotes";
import noteContext from "../context/notes/noteContext.js";
import { useContext } from "react";
import Loading from "./Loading.js";
import NotLogged from "./NotLogged.js"

export default function Home() {
  let { auth_Token}= useContext(noteContext);
  let [loggedIn, setLoggedIn] = useState(false);
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onReloading();
    setIsLoading(true)
    // eslint-disable-next-line
  }, [auth_Token]);
  

  function onReloading() {
    if (auth_Token) {
      setTimeout(() => {
        setIsLoading(false);
        setLoggedIn(true);
      }, 1200);
    } else {
      setTimeout(() => {
        setLoggedIn(false);
        setIsLoading(false);
      }, 1500);
    }
  }

      
       if (isLoading){
        return  <Loading></Loading>
      }
      else if (!loggedIn && !isLoading)
      {
        return <h1 style={{margin:'5rem'}}><NotLogged/></h1>
      }
      else if (loggedIn){
        return <div className="home">
          <AddNotes /> 
        <AllNotes />
        </div>
        }
}
