import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import FeedBack from "../Pages/FeedBack/FeedBack";
import MyPage from "../Pages/MyPage/MyPage";
import Plan from "../Pages/Plan/Plan";
import Home from "../Pages/Start/Home";

interface AppRouterProps {
  isLoggedIn: boolean;
  userObj?: any;
}

export default function AppRouter({ isLoggedIn, userObj }: AppRouterProps) {
  if (!isLoggedIn) {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={"/"} element={<Auth />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={"/"} element={<Home />}>
          <Route path={"/start/ready"} element={<Home />} />
        </Route>
        <Route path={"/plan"} element={<Plan />}></Route>
        <Route path={"/feedback"} element={<FeedBack />}></Route>
        <Route path={"/mypage"} element={<MyPage userObj={userObj} />}>
          <Route
            path={"/mypage/editprofile"}
            element={<MyPage userObj={userObj} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
