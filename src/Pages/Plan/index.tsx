import { useMatch } from "react-router-dom";
import Applayout from "../../Component/Applayout";
import Plan from "./Plan/Plan";
import CreateProject from "./Project/CreateProject";
import IntervalSetting from "./Project/IntervalSetting";

function Index() {
  const createMatch = useMatch("/plan/createProject");
  const intervalMatch = useMatch("/plan/intervalSetting/*");
  const isMatch = createMatch !== null || intervalMatch !== null;
  return (
    <Applayout>
      {!isMatch && <Plan />}
      {createMatch !== null && <CreateProject />}
      {intervalMatch !== null && <IntervalSetting />}
    </Applayout>
  );
}

export default Index;
