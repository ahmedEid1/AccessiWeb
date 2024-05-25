import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./app/globals.css";
import "./index.css";

// import style from "./styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
