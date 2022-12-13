import React from "react";
import "./NotLogged.css";

export default function NotLogged() {
  return (
    <>
      <div className="card text-bg-dark card-height border-info">
        <img
          src="http://www.pngall.com/wp-content/uploads/5/Sticky-Notes-PNG-File.png"
          className="card-img card-img-opacity"
          alt="..."
        />
        <div className="card-img-overlay">
          <div className="card-header fs-2 fw-bold">Welcome to UrFavNotes</div>
          <hr className="hori-line" />
          <div className="card-body">
            <p className="card-text fs-3">
              Store your notes, even secrets too here, you are just one step
              behind. Create a Free Account today and start storing your notes
              and secrets.
            </p>
          </div>
          <div className="card-footer fs-4 fw-semibold pt-0">
            Access your notes and secrets whenever you want.
          </div>
        </div>
      </div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="false"
        style={{ border: "1px solid red" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="http://www.codlrc.org/sites/default/files/staff/u165/paper-clipart-boy-6.png"
              className="d-block coursel-img-height "
              alt="..."
            />

            <div className="carousel-caption d-none d-md-block ">
              <h5 className="text-center fw-bold mb-5 card-header">
                No Need Of NoteBook
              </h5>
              <p className="fs-3 fw-semibold">
                Make use Of iNoteBook, forget the diaries, books, etc to write.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://lans-soapbox.com/wp-content/uploads/2012/08/to-do-list-cartoon.png"
              className="d-block coursel-img-height"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="card-header mb-5">Lighten Your Pocket Today</h5>
              <p className="fs-3 fw-semibold">
                No need to carry extra books, notes, diaries, etc to remember
                everything important notes.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </>
  );
}
