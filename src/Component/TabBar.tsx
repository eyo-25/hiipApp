import { motion } from "framer-motion";
import styled from "styled-components";
import { Dark_Gray } from "../Styles/Colors";

function TabBar() {
  return (
    <TabContainer>
      <Tab>
        <Tabs>
          <TabsTitle isActive={true}>프로젝트</TabsTitle>
        </Tabs>
        <Tabs>
          <TabsTitle isActive={false}>인터벌</TabsTitle>
        </Tabs>
      </Tab>
    </TabContainer>
  );
}

export default TabBar;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 4vh;
  max-width: 414px;
  background-color: white;
  border-top: 1px solid ${Dark_Gray};
`;
const Tab = styled.ul`
  display: flex;
  width: 85%;
  height: 100%;
  margin: 0 auto;
`;
const Tabs = styled.li`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 25%;
  @media screen and (max-height: 800px) {
    width: 20%;
  }
`;
const TabsTitle = styled.h4<{ isActive: boolean }>`
  font-weight: 600;
  font-size: 2vh;
  letter-spacing: -1.7px;
  color: ${(props) => (props.isActive ? "#000000" : "#c4c4c4")};
`;
