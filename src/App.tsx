import React, { useEffect, useState } from "react";
import { authService, dbService } from "./firebase";
import AppRouter from "./Router/AppRouter";
import "./Styles/GlobalFont.css";
import Splash from "./Component/Splash";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export interface IUserObjProps {
  userObj: any;
}

function App() {
  const [userObj, setUserObj] = useState<IUserObjProps | null>(null);
  console.log(userObj);
  const [isSplash, setIsSplash] = useState(true);
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize());
    setScreenSize();
  }, []);
  useEffect(() => {
    authService.onAuthStateChanged(async (user: any) => {
      if (user) {
        setUserObj(user);
        localStorage.setItem("user", JSON.stringify(user));
        dbService
          .collection("user")
          .doc(`${user.uid}`)
          .get()
          .then((result: any) => {
            localStorage.setItem("user", JSON.stringify(result.data()));
          });
      } else {
        setUserObj(null);
      }
    });
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  }, []);
  if (isSplash) {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={"/"} element={<Splash />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <>
      <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
    </>
  );
}

export default App;
