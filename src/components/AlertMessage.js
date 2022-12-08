import React from "react";
import "./AlertMessage.css";
import warningIcon from "./../Image/warning-icon.png";
import successIcon from "./../Image/success-icon.png";

export default function alertMessage(props) {
  // let { mess, color } = props.alertMessage;
  return (
    <>
      <div className={`alert alert-${props.alertMessage.color} toast-width`} role="alert">
        <img
          src={successIcon}
          alt="success alert"
          className="alert-icon"
          style={{ display:props.alertMessage.color === "success" ? "block" : "none" }}
        />
        <img
          src={warningIcon}
          alt="warning alert"
          className="alert-icon"
          style={{ display: props.alertMessage.color === "danger" ? "block" : "none" }}
        />
        {props.alertMessage.mess}
      </div>
    </>
  );
}

alertMessage.defaultProps = {
  color: "success",
  mess: "Done",
};
