// export const Preview = ({ files }) => {
//    if (!files.length) {
//       return null;
//    }
//    console.log(files + "good");
//    return files.map((file, index) => <img src={`//localhost:8000/${file.filename}`} alt="" key={index} />);
// };

import React, { useState } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Preview.css";

function Preview({ files, originalFiles }) {
   const [images, setImages] = useState(files);
   const [isMerged, setIsMerged] = useState(false);

   const handleOnDragEnd = (result) => {
      if (!result.destination) return;

      const items = Array.from(images);

      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setImages(items);
   };

   const onMergeHandler = (e) => {
      e.preventDefault();

      const fileNames = [];
      let newArray = [];
      for (let i = 0; i < images.length; i++) {
         fileNames[i] = images[i].originalname;
      }

      for (let i = 0; i < fileNames.length; i++) {
         let originalName = fileNames[i];

         for (let j = 0; j < originalFiles.length; j++) {
            let file = originalFiles[j];
            if (originalName === file.name) {
               newArray[i] = file;
            }
         }
      }

      console.log(newArray);
      const data = new FormData();

      for (let i = 0; i < newArray.length; i++) {
         data.append("file", newArray[i]);
      }

      axios
         // .post("https://pdfbackend1.herokuapp.com/merge", data)
         .post("https://pdfbackend1.herokuapp.com/merge", data)
         .then((res) => {
            console.log("Success");
         })
         .catch((e) => {
            console.log("Error", e);
         });

      setIsMerged(true);
   };

   const onDownloadHandler = () => {
      axios.get("https://pdfbackend1.herokuapp.com/download", { responseType: "arraybuffer" }).then((res) => {
         const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
         var link = document.createElement("a");
         link.href = url;
         link.setAttribute("download", "output.pdf");
         document.body.appendChild(link);
         link.click();
      });
   };

   const grid = 8;

   const getItemStyle = (isDragging, draggableStyle) => ({
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      padding: grid * 2,
      margin: `0 ${grid}px 0 0`,

      // change background colour if dragging
      background: isDragging ? "lightgreen" : "grey",

      // styles we need to apply on draggables
      ...draggableStyle,
   });

   const getListStyle = (isDraggingOver) => ({
      background: isDraggingOver ? "lightblue" : "lightgrey",
      display: "flex",
      padding: grid,
      overflow: "auto",
      height: 500,
   });

   return (
      <div className="major">
         Uploaded Images
         <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
               {(provided, snapshot) => (
                  <div
                     className="container"
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     style={getListStyle(snapshot.isDraggingOver)}
                  >
                     {images.map((file, id, index) => (
                        <Draggable key={id} draggableId={"" + id} index={id}>
                           {(provided, snapshot) => (
                              <img
                                 // src={`https://pdfbackend1.herokuapp.com/${file.filename}`}
                                 src={`https://pdfbackend1.herokuapp.com/${file.filename}`}
                                 alt=""
                                 key={id}
                                 {...provided.draggableProps}
                                 ref={provided.innerRef}
                                 {...provided.dragHandleProps}
                                 style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                 className="image"
                              />
                           )}
                        </Draggable>
                     ))}
                     {provided.placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>
         {!isMerged ? (
            <button onClick={onMergeHandler} className="merge-btn">
               merge
            </button>
         ) : (
            <button onClick={onDownloadHandler} className="download-btn">
               download
            </button>
         )}
      </div>
   );
}

export default Preview;
