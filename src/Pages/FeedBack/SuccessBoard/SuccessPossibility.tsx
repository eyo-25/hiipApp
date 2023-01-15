import styled from "styled-components";
import { useState } from "react";
import SuccessPossibilityGraph from "./SuccessPossibilityGraph";

function SuccessPossibility() {
  const [clickedName, setClickedName] = useState("day");
  const onMenuClicked = (name: string) => {
    setClickedName(name);
  };
  return (
    <Wrapper>
      <Container>
        <MenuContainer>
          <MenuBox
            isClicked={clickedName === "day"}
            onClick={() => onMenuClicked("day")}
          >
            일
          </MenuBox>
          <MenuBox
            isClicked={clickedName === "week"}
            onClick={() => onMenuClicked("week")}
          >
            주
          </MenuBox>
          <MenuBox
            isClicked={clickedName === "total"}
            onClick={() => onMenuClicked("total")}
          >
            전체
          </MenuBox>
          <MenuBox
            isClicked={clickedName === "individual"}
            onClick={() => onMenuClicked("individual")}
          >
            개별
          </MenuBox>
        </MenuContainer>
        <ScoreInfoContainer>
          <h3>
            데드라인 내 <br />
            완료 가능성
          </h3>
          <ScoreBox>
            <h2>26.5</h2>
            <span>%</span>
          </ScoreBox>
        </ScoreInfoContainer>
        <GraphContainer>
          <SuccessPossibilityGraph />
        </GraphContainer>
      </Container>
    </Wrapper>
  );
}

export default SuccessPossibility;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 62%;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 90%;
`;
const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-end;
  height: 17%;
  width: 100%;
  cursor: pointer;
`;
const MenuBox = styled.div<{ isClicked: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isClicked ? "black" : "white")};
  justify-content: center;
  align-items: center;
  height: 4.3vh;
  max-height: 38px;
  width: 100%;
  font-size: 1.5vh;
  color: ${(props) => (props.isClicked ? "white" : "#828282")};
`;
const ScoreInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 36%;
  width: 100%;
`;
const ScoreBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 1.8vh;
`;
const GraphContainer = styled.div`
  display: flex;
  height: 47%;
  width: 100%;
`;
