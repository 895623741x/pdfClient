import { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import UploadZone from "./UploadZone/UploadZone";
import Preview from "./Preview/Preview";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
   const [files, setFiles] = useState([]);
   const [originalFiles, setOriginalFiles] = useState([]);
   const onSuccess = (uploadedFiles) => {
      setFiles(uploadedFiles);
   };

   const onPreserve = (uploadedFiles) => {
      setOriginalFiles(uploadedFiles);
   };
   console.log(originalFiles);
   console.log("good");

   console.log(files);

   return (
      <Router>
         <div className="App">
            {/* <UploadZone onSuccess={onSuccess} />
         <Preview files={files} /> */}
            <Switch>
               <Route exact path="/" component={() => <UploadZone onSuccess={onSuccess} onPreserve={onPreserve} />} />
               <Route path="/preview" component={() => <Preview files={files} originalFiles={originalFiles} />} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
