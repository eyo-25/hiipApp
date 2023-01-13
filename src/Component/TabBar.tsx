import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { projectState } from "../Recoil/atoms";
import { Dark_Gray } from "../Styles/Colors";

function TabBar() {
  const [project, setProject] = useRecoilState(projectState);
  const navigate = useNavigate();
  const createMatch = useMatch("/plan/createProject");
  const isCreateMatch = createMatch !== null;
  const tabVariants = {
    normal: {
      height: isCreateMatch ? "4vh" : "0vh",
    },
    animate: {
      height: "4vh",
      transition: {
        duration: 0.5,
      },
    },
  };
  const fadeinVariants = {
    normal: {
      opacity: isCreateMatch ? 1 : 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.6,
        type: "linear",
      },
    },
  };
  const onTabClick = (address: string) => {
    navigate(address);
  };
  const onIntervalClick = () => {
    if (project.length <= 0) {
      return;
    } else {
      navigate("/plan/intervalSetting/edit");
    }
  };
  const planMatch = useMatch("/plan/*");
  const intervalMatch = useMatch("/plan/intervalSetting/*");
  return (
    <TabContainer variants={tabVariants} initial="normal" animate="animate">
      <Tab variants={fadeinVariants} initial="normal" animate="animate">
        <Tabs onClick={() => onTabClick("/plan")}>
          <TabsTitle isActive={planMatch !== null && intervalMatch === null}>
            프로젝트
          </TabsTitle>
        </Tabs>
        <Tabs onClick={onIntervalClick}>
          <TabsTitle isActive={intervalMatch !== null}>인터벌</TabsTitle>
        </Tabs>
      </Tab>
    </TabContainer>
  );
}

export default TabBar;

const TabContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 4);
  max-width: 414px;
  background-color: white;
  border-top: 1px solid ${Dark_Gray};
`;
const Tab = styled(motion.ul)`
  display: flex;
  width: 85%;
  height: 100%;
  margin: 0 auto;
  cursor: pointer;
`;
const Tabs = styled.li`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 25%;
  @media screen and (max-height: 800px) {
    width: 22%;
  }
`;
const TabsTitle = styled.h4<{ isActive: boolean }>`
  font-weight: 600;
  font-size: 2vh;
  letter-spacing: -1.7px;
  color: ${(props) => (props.isActive ? "#000000" : "#c4c4c4")};
`;
