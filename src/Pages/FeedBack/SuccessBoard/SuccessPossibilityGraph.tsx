import styled from "styled-components";

import { useEffect, useState } from "react";
import { Blue, Dark_Gray, Dark_Gray4 } from "../../../Styles/Colors";
import { feedBackTimerState } from "../../../Recoil/atoms";
import { useRecoilState } from "recoil";

function SuccessPossibilityGraph() {
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [timerArray, setTimerArray] = useRecoilState<any[]>(feedBackTimerState);
  const Moment = require("moment");
  const todayDay = Moment().day();

  return (
    <Wrapper>
      <GraphBox>
        <LineContainer>
          <Line />
          <Line />
          <Line />
          <Line />
          <Line />
        </LineContainer>
        <BarContainer>
          {calendarDays.map((days, index) => (
            <BarBox key={days}>
              {7 === timerArray.length && (
                <Bar
                  height={timerArray[index].successPercent}
                  color={Dark_Gray}
                  today={todayDay === index}
                ></Bar>
              )}
            </BarBox>
          ))}
        </BarContainer>
        <DayContainer>
          {calendarDays.map((days) => (
            <DayBox key={days}>{days}</DayBox>
          ))}
        </DayContainer>
      </GraphBox>
    </Wrapper>
  );
}

export default SuccessPossibilityGraph;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: 5%;
`;
const GraphBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const LineContainer = styled.div`
  position: relative;
  width: 100%;
  height: 88%;
`;
const Line = styled.div`
  height: 20%;
  width: 100%;
  border-top: 0.5px solid ${Dark_Gray4};
  &:first-child {
    border-top: none;
  }
`;
const BarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90%;
  height: 88%;
  display: flex;
`;
const BarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  width: 100%;
`;
const Bar = styled.div<{ height: number; today: boolean; color: string }>`
  height: ${(props) => props.height}%;
  width: 50%;
  background-color: ${(props) => (props.today ? Blue : Dark_Gray)};
`;
const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 12%;
  width: 90%;
  margin: 0 auto;
`;
const DayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 1.4vh;
  color: ${Dark_Gray4};
`;
