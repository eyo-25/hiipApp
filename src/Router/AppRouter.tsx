import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomeSplash from "../Component/HomeSplash";
import Auth from "../Pages/Auth/Auth";
import FeedBack from "../Pages/FeedBack/FeedBack";
import MyPage from "../Pages/MyPage/MyPage";
import IntervalSetting from "../Pages/Plan/Project/IntervalSetting";
import Plan from "../Pages/Plan/Plan/Plan";
import CreateProject from "../Pages/Plan/Project/CreateProject";
import Home from "../Pages/Start/Home";
import Loader from "../Component/Loader";
import { useRecoilState } from "recoil";
import { homeSplashState, loadState } from "../Recoil/atoms";
import Start from "../Pages/Start/Start/Start";
import Index from "../Pages/Plan";
import Timer from "../Pages/Start/Timer/Timer";

interface AppRouterProps {
  isLoggedIn: boolean;
  userObj?: any;
}

export default function AppRouter({ isLoggedIn, userObj }: AppRouterProps) {
  const [isHomeSplash, setHomeSplash] = useRecoilState(homeSplashState);
  const [isLoad, setIsLoad] = useRecoilState(loadState);
  if (!isLoggedIn) {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoad && <Loader />}
        <Routes>
          <Route path={"/"} element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {isLoad && <Loader />}
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/timer/:todoId"} element={<Timer />} />
        <Route path={"/plan"} element={<Index />}>
          <Route path={"/plan/memo/:todoId"} element={<Plan />} />
          <Route path={"/plan/createTodo"} element={<Plan />} />
          <Route path={"/plan/editTodo/:todoId"} element={<Plan />} />
          <Route path={"/plan/createProject"} element={<Plan />} />
          <Route path={"/plan/intervalSetting/:purpose"} element={<Plan />} />
        </Route>
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
