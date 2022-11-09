import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import FeedBack from "../Pages/FeedBack/FeedBack";
import MyPage from "../Pages/MyPage/MyPage";
import Plan from "../Pages/Plan/Plan";
import Home from "../Pages/Start/Home";

export default function AppRouter({ isLoggedIn }: { isLoggedIn: boolean }) {
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
      </Routes>
      <Routes>
        <Route path={"/plan"} element={<Plan />}></Route>
      </Routes>
      <Routes>
        <Route path={"/feedback"} element={<FeedBack />}></Route>
      </Routes>
      <Routes>
        <Route path={"/mypage"} element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
