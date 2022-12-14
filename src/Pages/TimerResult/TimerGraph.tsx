import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dark_Gray, Dark_Gray4 } from "../../Styles/Colors";
import { resultColor, resultGraphMent } from "../../Utils/interface";

interface ITimerGrap {
  timerArray: any[];
  timerIndex: number;
  resultStatus?: string;
}

function TimerGraph({ timerArray, resultStatus, timerIndex }: ITimerGrap) {
  const Moment = require("moment");
  const todayDay = Moment().day();
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [percentDiff, setPercentDiff] = useState(0);

  //초기화
  useEffect(() => {
    if (todayDay !== 0 && 1 < timerIndex) {
      const diff =
        timerArray[todayDay].successPercent -
        timerArray[todayDay - 1].successPercent;
      setPercentDiff(diff);
    } else {
      setPercentDiff(timerArray[todayDay].successPercent);
    }
  }, [timerArray]);

  return (
    <ResultGraphContainer>
      {resultStatus && (
        <GraphTextBox>
          <h4>COACH TIP</h4>
          <p>
            {resultGraphMent[resultStatus]}
            <br />
            {0 <= percentDiff ? (
              <span style={{ color: resultColor[resultStatus] }}>
                {percentDiff ? percentDiff : 0}% 상승
              </span>
            ) : (
              <span style={{ color: resultColor[resultStatus] }}>
                {Math.abs(percentDiff) ? Math.abs(percentDiff) : 0}% 하락
              </span>
            )}
            하였습니다.
          </p>
        </GraphTextBox>
      )}
      <GraphBox>
        <LineBox>
          <Line />
          <Line />
          <Line />
        </LineBox>
        <BarContainer>
          {calendarDays.map((days, index) => (
            <BarBox key={days}>
              <Bar
                height={
                  timerArray[index].successPercent
                    ? timerArray[index].successPercent
                    : 0
                }
                color={resultStatus ? resultColor[resultStatus] : "Black"}
                today={todayDay === index}
              ></Bar>
            </BarBox>
          ))}
        </BarContainer>
        <DayContainer>
          {calendarDays.map((days) => (
            <DayBox key={days}>{days}</DayBox>
          ))}
        </DayContainer>
      </GraphBox>
    </ResultGraphContainer>
  );
}

export default TimerGraph;

const ResultGraphContainer = styled.div`
  border-radius: 7px;
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 2.3vh 3vh;
`;
const GraphTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 35%;
  h4 {
    font-weight: 600;
    margin-bottom: 1.4vh;
    font-size: 2.3vh;
  }
  p {
    font-weight: 500;
    letter-spacing: -0.8px;
    line-height: 1.3;
    text-align: center;
    font-size: 1.8vh;
  }
`;
const GraphBox = styled.div`
  position: relative;
  height: 65%;
`;
const LineBox = styled.div`
  position: relative;
  width: 100%;
  height: 88%;
`;
const Line = styled.div`
  height: 33.33%;
  width: 100%;
  border-top: 0.5px solid ${Dark_Gray4};
  &:last-child {
    border-bottom: 0.5px solid ${Dark_Gray4};
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
  background-color: ${(props) => (props.today ? props.color : Dark_Gray)};
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
