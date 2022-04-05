import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserContexProvider } from "./Components/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContexProvider>
      <App />
    </UserContexProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
