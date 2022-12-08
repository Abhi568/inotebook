import React from "react";
import "./NoteItems.css";
import EditNote from "./../Image/pen-to-square-regular.svg";
import DeleteNote from "./../Image/trash-can-regular.svg";

export default function NotesItems(props) {
  let { title, description, tag, _id } = props.note;
  let getData = props.getData;
  // let { removeNote } = useContext(noteContext);
  // let alertMessage = {
  //   "mess":"Note Deleted Succcessfully",
  //    "color":"success"
  // }
  // let [toastVisibilty1, setToastVisibilty1] = useState(false);

  // function deleteNote() {
  //   setToastVisibilty1(true);
  //   console.log('tv',toastVisibilty1)
  //   makeToastInvisible1()
  //   removeNote(_id);
    
  // };
  // const makeToastInvisible1 = () => {
  //   console.log("Came here for settime out")
  //   setTimeout(() => {
  //     console.log(" execute here in set time out")
  //     setToastVisibilty1(false);
  //   }, 1500);
  // };

  return (
    <>
    {/* {toastVisibilty1 && 
        <div className="alert-message">
          <AlertMessage alertMessage={alertMessage} />
        </div>
}
      */}
      
      <div className="card my-2" style={{ width: "100%" }}>
        <p className="tag">{tag}</p>
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
          <p className="card-text">{description}</p>
        </div>
      </div>
    </>
  );
}
