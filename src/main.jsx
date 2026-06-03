import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// This is the entry point of the React app.
// React renders <App /> into the <div id="root"></div> in index.html.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
