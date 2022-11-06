import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedBack from "../Pages/FeedBack/FeedBack";
import MyPage from "../Pages/MyPage/MyPage";
import Plan from "../Pages/Plan/Plan";
import Home from "../Pages/Start/Home";

export default function AppRouter() {
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
        <Route path={"/feedBack"} element={<FeedBack />}></Route>
      </Routes>
      <Routes>
        <Route path={"/myPage"} element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
