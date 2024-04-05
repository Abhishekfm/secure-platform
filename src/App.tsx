// App.tsx
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AllRoutes from "./AllRoutes";

const App: React.FC = () => {
  return (
    <div className="App">
      <ToastContainer />
      <AllRoutes />
    </div>
  );
};

export default App;
