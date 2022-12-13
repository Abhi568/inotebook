import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Footer.css"

export default function Footer() {
  let [year, setYear] = useState("");
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <div className="footer bg-primary  mt-5">
            <h1 className="text-center fs-5 p-2 mb-0">
        All Rights Are Reserved {year - 1} - {year}
      </h1>
    </div>
  );
}
