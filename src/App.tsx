import React, { useEffect, useRef, useState } from "react";
import Loder from "./Component/Loder";
import { authService, dbService } from "./firebase";
import AppRouter from "./Router/AppRouter";
import "./Styles/GlobalFont.css";

export interface IUserObjProps {
  userObj: any;
}

function App() {
  const [userObj, setUserObj] = useState<IUserObjProps | null>(null);
  useEffect(() => {
    authService.onAuthStateChanged(async (user: any) => {
      if (user) {
        setUserObj(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUserObj(null);
      }
    });
  }, []);
  return (
    <>
      {/* <Loder /> */}
      <AppRouter isLoggedIn={Boolean(userObj)} />
    </>
  );
}

export default App;
