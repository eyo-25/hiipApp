import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import Background from "../../../Assets/image/bull.png";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, query } from "firebase/firestore";
import {
  inputFocusState,
  isBreakState,
  isPauseState,
  timerState,
} from "../../../../Recoil/atoms";
import TimerButton from "./TimerButton";
import { isAndroid } from "react-device-detect";
import TimerInfo from "./TimerInfo";
import { dbService } from "../../../../firebase";
import { useCounter } from "../../../../hooks/useCounter";
import IntervalTimer from "./IntervalTimer";
import BreakTimer from "./BreakTimer";

function TimerBoard() {
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [minutes, setMinutes] = useState(timerObj.min);
  const [seconds, setSeconds] = useState(timerObj.sec);
  const params = useParams();
  const todoId = params.todoId;

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

  //파이어베이스 timer 업데이트
  async function updateTimeSubmit(type: string) {
    const isDone = type === "done";
    try {
      await dbService
        .collection("plan")
        .doc(todoId)
        .collection("timer")
        .doc(timerObj.id)
        .update({
          focusSet: isDone ? 0 : timerObj.focusSet - 1,
          min: isDone ? 0 : timerObj.setFocusMin,
          sec: isDone ? 0 : timerObj.setFocusSec,
        });
    } catch (e) {
      alert("타이머 ERROR.");
    }
  }

  //count를 시간으로 변환하여 표현
  const timer = async () => {
    if (timerObj.focusSet <= 0) return;
    //done
    if (timerObj.focusSet === 1 && count <= 0) {
      setSeconds(0);
      done();
      setTimerObj((prev) => {
        return {
          ...prev,
          focusSet: 0,
          min: 0,
          sec: 0,
        };
      });
      await updateTimeSubmit("done");
      setIsPause(true);
      return;
    }
    //count
    if (1 <= timerObj.focusSet && 0 < count) {
      const mathMin = Math.floor(count / 60);
      const mathSec = Math.floor(count - mathMin * 60);
      setMinutes(mathMin);
      setSeconds(mathSec);
      setTimerObj((prev) => {
        return {
          ...prev,
          min: mathMin,
          sec: mathSec,
        };
      });
    }
    //nextSet
    if (1 < timerObj.focusSet && count <= 0) {
      setSeconds(0);
      await updateTimeSubmit("next");
      setIsBreakSet(true);
      setTimerObj((prev) => {
        return {
          ...prev,
          focusSet: timerObj.focusSet - 1,
          min: timerObj.setFocusMin,
          sec: timerObj.setFocusSec,
        };
      });
      reset();
    }
  };

  useEffect(() => {
    timer();
  }, [count]);

  return (
    <>
      <ContentsWrapper>
        <InfoWrapper>
          <TimerInfo count={isBreakSet ? breakCount : count} />
        </InfoWrapper>
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
      </ContentsWrapper>
      {!(isAndroid && inputToggle) && (
        <ButtonWrapper>
          <TimerButton
            count={isBreakSet ? breakCount : count}
            stop={isBreakSet ? breakStop : stop}
            start={isBreakSet ? breakStart : start}
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
