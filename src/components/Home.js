import React, { useEffect } from "react";
import { useState } from "react";
import AddNotes from "./AddNotes";
import AllNotes from "./AllNotes";
import noteContext from "../context/notes/noteContext.js";
import { useContext } from "react";
import Loading from "./Loading.js";
import NotLogged from "./NotLogged.js";
import Footer from "./Footer.js";
import "./Home.css";

export default function Home() {
  let { auth_Token } = useContext(noteContext);
  let [loggedIn, setLoggedIn] = useState(false);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onReloading();
    // eslint-disable-next-line
  }, [auth_Token]);

  function onReloading() {
    setIsLoading(true);
    setTimeout(() => {
      if (auth_Token.length > 0) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setIsLoading(false);
    }, 1200);
  }
  let ele;
  if (isLoading) {
    ele = <Loading></Loading>;
  } else if (!loggedIn && !isLoading) {
    ele = (
      <div className="home">
        <div className="not-logged">
          <NotLogged />
        </div>
      </div>
    );
  } else if (loggedIn) {
    ele = (
      <div className="home">
        <AddNotes />
        <AllNotes />
        <Footer></Footer>
      </div>
    );
  }

  return ele;
}
