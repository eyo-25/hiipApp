import { useRecoilState } from "recoil";
import {
  inputFocusState,
  isAddState,
  isBreakState,
  timerSplashState,
  timerState,
} from "../../../Recoil/atoms";
import { useEffect } from "react";
import IntervalTimer from "./IntervalTimer";
import BreakTimer from "./BreakTimer";
import styled from "styled-components";
import { useCounter } from "../../../hooks/useCounter";
import { isAndroid } from "react-device-detect";
import TimerInfo from "./TimerInfo";
import TimerButton from "./TimerButton";

function TimerBoard() {
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [isTimerSplash, setIsTimerSplash] = useRecoilState(timerSplashState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);

  const { count, start, stop, reset, done } = useCounter(
    timerObj.min * 60 + timerObj.sec,
    timerObj.setFocusMin * 60 + timerObj.setFocusSec
  );

  const {
    count: breakCount,
    start: breakStart,
    stop: breakStop,
    reset: breakReset,
    done: breakDone,
  } = useCounter(
    timerObj.breakMin * 60 + timerObj.breakSec,
    timerObj.setBreakMin * 60 + timerObj.setBreakSec
  );

  useEffect(() => {
    setIsAdd(false);
    return () => {
      setIsTimerSplash(true);
      setIsAdd(false);
    };
  }, []);

  return (
    <>
      <ContentsWrapper>
        <>
          {!isAdd && (
            <InfoWrapper>
              <TimerInfo count={isBreakSet ? breakCount : count} />
            </InfoWrapper>
          )}
          {!isBreakSet && (
            <IntervalTimer
              count={count}
              start={start}
              stop={stop}
              reset={reset}
              done={done}
            />
          )}
          {isBreakSet && (
            <BreakTimer
              count={breakCount}
              start={breakStart}
              stop={breakStop}
              reset={breakReset}
              done={breakDone}
            />
          )}
        </>
      </ContentsWrapper>
      {!(isAndroid && inputToggle) && (
        <ButtonWrapper>
          <TimerButton
            count={isBreakSet ? breakCount : count}
            stop={isBreakSet ? breakStop : stop}
            start={isBreakSet ? breakStart : start}
            reset={isBreakSet ? breakReset : reset}
            breakReset={breakReset}
            breakStop={breakStop}
          />
        </ButtonWrapper>
      )}
    </>
  );
}

export default TimerBoard;

const ContentsWrapper = styled.div`
  position: relative;
  z-index: 10;
  height: 70%;
  width: 100%;
  color: white;
`;
const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  height: 30%;
  width: 100%;
  z-index: 10;
`;
const InfoWrapper = styled.div`
  height: 42%;
  @media screen and (max-height: 800px) {
    height: 38%;
  }
  @media screen and (max-height: 750px) {
    height: 35%;
  }
`;
