import React from "react";
import "./NoteItems.css";
import EditNote from "./../Image/pen-to-square-regular.svg";
import DeleteNote from "./../Image/trash-can-regular.svg";

export default function NotesItems(props) {
  let { title, description, tag, _id } = props.note;
  let getData = props.getData;

  return (
    <>      
    <p className="tag">{tag}</p>
      <div className="card my-2" style={{ width: "100%" }}>
        
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="card-title fw-bold fs-5">{title}</div>
            <div className="button-section">
              <img
                src={EditNote}
                onClick={() => getData(props.note, _id)}
                alt=""
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
              <img
                src={DeleteNote}
                alt=""
                data-bs-toggle="modal"
                data-bs-target="#confirmBox"
                onClick={()=> getData(props.note,_id) }
              />
            </div>
          </div>
          <p className="card-text">{description.length>100 ? description.substr(0,100) + "..." : description }</p>
        </div>
      </div>
    </>
  );
}
