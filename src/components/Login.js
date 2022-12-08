import React from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import { useContext } from "react";
import "./Login.css";
import AlertMessage from "./AlertMessage.js";
export default function Login() {
  let { settingAuthToken } = useContext(noteContext);
  let host = "http://localhost:5000";
  let [toastVisibilty, setToastVisibilty] = useState(false);
  let [credentials, setCredentials] = useState({
    emailID: "",
    password: "",
  });
  let [alertMessage, setAlertMessage] = useState({
    mess: "",
    color: "",
  });

  const setValues = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const makeToastInvisible = () => {
    setTimeout(() => {
      setToastVisibilty(false);
      setAlertMessage({ mess: "", color: "" });
    }, 1500);
  };
  const logIn = (e) => {
    e.preventDefault();
    fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((res) => {
        
        if (!res.err) {
          setAlertMessage({mess: "LoggedIn Successfully",
            color: "success",
          });
          localStorage.setItem("auth-token", JSON.stringify(res));
          settingAuthToken();
        } else {
          setAlertMessage({ mess: res.err, color: "danger" });
        }
        setToastVisibilty(true);
      })
      .catch((err) => console.log("Some Error occured while Login",err));
    setCredentials({
      emailID: "",
      password: "",
    });

    makeToastInvisible();
  };

  return (
    <>
      {toastVisibilty && (
        <div className="alert-message">
          <AlertMessage alertMessage={alertMessage} />
        </div>
      )}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="login"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Login
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={logIn}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailID"
                aria-describedby="emailHelp"
                value={credentials.emailID}
                onChange={setValues}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={credentials.password}
                onChange={setValues}
              />
            </div>
            <button
              disabled={!(credentials.emailID!=="" && credentials.password!=="")}
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="offcanvas"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
