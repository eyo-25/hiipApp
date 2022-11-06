import React, { useEffect, useRef } from "react";
import Loder from "./Component/Loder";
import AppRouter from "./Router/AppRouter";
import "./Styles/GlobalFont.css";

function App() {
  return (
    <>
      {/* <Loder /> */}
      <AppRouter />
    </>
  );
}

export default App;
