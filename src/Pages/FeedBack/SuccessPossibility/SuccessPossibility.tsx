import styled from "styled-components";
import { useEffect, useState } from "react";
import SuccessPossibilityGraph from "./SuccessPossibilityGraph";
import { Normal_Gray } from "../../../Styles/Colors";

function SuccessPossibility() {
  return (
    <Wrapper>
      <Container>
        <MenuContainer>
          <MenuBox>일</MenuBox>
          <MenuBox>주</MenuBox>
          <MenuBox>전체</MenuBox>
          <MenuBox>개별</MenuBox>
        </MenuContainer>
        <ScoreInfoBox>
          <h3>
            데드라인 내 <br />
            완료 가능성
          </h3>
          <ScoreBox>
            <h2>26.5</h2>
            <span>%</span>
          </ScoreBox>
        </ScoreInfoBox>
        <Box3>
          <SuccessPossibilityGraph />
        </Box3>
      </Container>
    </Wrapper>
  );
}

export default SuccessPossibility;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 70);
  width: 100%;
  background-color: white;
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
  height: 12%;
  width: 100%;
`;
const MenuBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.3vh;
  width: 100%;
  font-size: 1.5vh;
  color: #828282;
  background-color: ${Normal_Gray};
`;
const ScoreInfoBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 30%;
  width: 100%;
`;
const ScoreBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 1.8vh;
`;
const Box3 = styled.div`
  display: flex;
  height: 58%;
  width: 100%;
`;
