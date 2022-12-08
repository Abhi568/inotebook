import React from "react";
import { useState } from "react";

export default function SignUp() {
  let [userData, setUserData] = useState({
    name: "",
    emailID: "",
    password: "",
  });
  let host = "http://localhost:5000";

  const SignUp = (e) => {
    e.preventDefault();
    fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("SignUp Successfully", res);
      })
      .catch((err) => console.log("Some error occured while Login"));
    setUserData({
      name: "",
      emailID: "",
      password: "",
    });
  };

  const setValues = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };
  return (
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
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              value={userData.name}
              onChange={setValues}
            />
          </div>
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label mt-3">
              Email address
            </label>
            <input
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
              type="password"
              className="form-control"
              id="password"
              aria-describedby="passwordHelp"
              value={userData.password}
              onChange={setValues}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary my-3"
            data-bs-dismiss="offcanvas"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
