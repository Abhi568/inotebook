import React from "react";
import "./Loading.css";

export default function Loading(props) {
  return (
    <div className="spinner" style={{height:props.heightOfPage}}>
      <div
        className="spinner-border"
        style={{ width: props.widthOfSpinner, height: props.heightOfSpinner }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow"
        style={{ width: props.widthOfSpinner, height: props.heightOfSpinner }}
        role="status"
      >
      </div>
    </div>
  );
}
Loading.defaultProps = {
    heightOfPage:'80vh',
    widthOfSpinner:"3rem",
    heightOfSpinner:"3rem"
  };
