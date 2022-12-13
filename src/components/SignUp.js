import React from "react";
import { useState } from "react";
import AlertMessage from "./AlertMessage";

export default function SignUp() {
  let [toastVisibilty, setToastVisibilty] = useState(false);
  let [alertMessage, setAlertMessage] = useState({
    mess: "",
    color: "",
  });
  let [userData, setUserData] = useState({
    name: "",
    emailID: "",
    password: "",
  });
  let host = "http://localhost:5000";

  const makeToastInvisible = () => {
    setTimeout(() => {
      setToastVisibilty(false);
      setAlertMessage({ mess: "", color: "" });
    }, 1500);
  };

  const SignUp = (e) => {
    e.preventDefault();
    let regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (userData.emailID.match(regexForEmail)) {
      fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.Error) {
            setToastVisibilty(true);
            setAlertMessage({ mess: res.Error, color: "danger" });
          } else {
            console.log("SignUp Successfully", res);
          }
        })
        .catch((err) => {
          console.log("Some error occured");
        });
    } else {
      setToastVisibilty(true);
      setAlertMessage({ mess: "Enter a valid Email", color: "danger" });
    }
    setUserData({
      name: "",
      emailID: "",
      password: "",
    });
    makeToastInvisible();
  };

  const setValues = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
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
        data-bs-scroll="false"
        tabIndex="-1"
        id="signup"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Signup
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={SignUp}>
            <div>
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                placeholder="Enter Name"
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                value={userData.name}
                onChange={setValues}
              />
              <div id="password" className="form-text">
                Name should have atleast 2 characters
              </div>
            </div>
            <div>
              <label htmlFor="exampleInputEmail1" className="form-label mt-3">
                Email address
              </label>
              <input
                placeholder="Enter Email"
                type="email"
                className="form-control"
                id="emailID"
                aria-describedby="emailHelp"
                value={userData.emailID}
                onChange={setValues}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div>
              <label htmlFor="exampleInputPassword" className="form-label mt-3">
                Password
              </label>
              <input
                placeholder="Enter Password"
                type="password"
                className="form-control"
                id="password"
                aria-describedby="passwordHelp"
                value={userData.password}
                onChange={setValues}
              />
              <div id="password" className="form-text">
                Password should have atleast 5 characters
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary my-3"
              data-bs-dismiss="offcanvas"
              disabled={
                userData.name.length < 2 || userData.password.length < 5
              }
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
