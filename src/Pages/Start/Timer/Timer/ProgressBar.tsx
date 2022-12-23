import styled from "styled-components";
import { Blue, Red } from "../../../../Styles/Colors";
import { useProgressBar } from "../../../../hooks/useProgressBar";
import { timerState } from "../../../../Recoil/atoms";
import { useRecoilState } from "recoil";

interface ITimerInfo {
  count: number;
}

export function ProgressBar({ count }: ITimerInfo) {
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const { progressArray, breakWidth, focusWidth, totalSet, nowSet } =
    useProgressBar(count);
  return (
    <Container>
      {progressArray.map((data, index) => {
        return (
          <ProgressBox
            key={index}
            style={{
              width: `${
                (index + 1) % 2 === 0 ? breakWidth.current : focusWidth.current
              }%`,
            }}
            isBreak={(index + 1) % 2 === 0}
          >
            <ProgressGauge
              style={{
                width: `${data}%`,
              }}
              isBreak={(index + 1) % 2 === 0}
            >
              {index === nowSet.current &&
                (index + 1) % 2 !== 0 &&
                totalSet.current !== nowSet.current && <ProgressEdge />}
            </ProgressGauge>
          </ProgressBox>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  height: 5px;
  width: 100%;
  margin-bottom: 20px;
`;
const ProgressBox = styled.div<{ isBreak: boolean }>`
  position: relative;
  display: flex;
  height: 100%;
  background-color: ${(props) =>
    props.isBreak ? "rgba(0,0,0,0)" : "rgba(255,255,255,1)"};
`;
const ProgressGauge = styled.div<{ isBreak: boolean }>`
  position: absolute;
  top: 0;
  display: flex;
  height: 100%;
  background-color: ${(props) => (props.isBreak ? Red : Blue)};
  z-index: 10;
`;
const ProgressEdge = styled.div`
  position: absolute;
  right: -0.5px;
  bottom: -0.05px;
  width: 2px;
  height: 100%;
  background-color: Red;
`;
