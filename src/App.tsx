import React, { useEffect, useState } from "react";
import { authService, dbService } from "./firebase";
import AppRouter from "./Router/AppRouter";
import Splash from "./Component/Splash";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export interface IUserObjProps {
  userObj: any;
}

function App() {
  const [userObj, setUserObj] = useState<IUserObjProps | null>(null);
  const [isSplash, setIsSplash] = useState(true);
  const isLoggedIn = Boolean(userObj);
  //리사이즈 이벤트발생시 vh 다시설정
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize());
    setScreenSize();
  }, []);
  //유저변경 감지
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
  }, []);
  if (isSplash) {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          {isSplash && (
            <Route path={"/"} element={<Splash setIsSplash={setIsSplash} />} />
          )}
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
    </>
  );
}

export default App;
