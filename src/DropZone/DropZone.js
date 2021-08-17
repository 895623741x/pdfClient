import React, { useState, useEffect } from "react";
import "./DropZone.css";

import axios from "axios";

function DropZone() {
   const [files, setFiles] = useState([]);
   console.log(files);

   const onChangeHandler = (event) => {
      setFiles(event.target.files);
   };

   const onClickHandler = () => {
      const data = new FormData();
      for (var x = 0; x < files.length; x++) {
         data.append("file", files[x]);
      }

      axios
         .post("http://localhost:8000/upload", data, {
            // receive two    parameter endpoint url ,form data
         })

         .then((res) => {
            // then print response status
            console.log(res.statusText);
         });
   };

   return (
      <div>
         <form method="post" action="#" id="#">
            <div className="form-group files">
               <label>Upload Your File </label>
               <input type="file" className="form-control" multiple onChange={onChangeHandler}></input>
            </div>
         </form>
         <button onClick={onClickHandler}>upload</button>
      </div>
   );
}

export default DropZone;
