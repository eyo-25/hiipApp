import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../../firebase";
import {
  inputFocusState,
  isBreakState,
  isPauseState,
  timerState,
} from "../../../../Recoil/atoms";

const TextUpVarients = {
  start: {
    opacity: 0,
    y: 4,
  },
  coundStart: {
    opacity: 0,
    y: 6,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spling",
    },
  },
};

interface IIntervalTimer {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  done: () => void;
}

function IntervalTimer({ count, start, stop, reset, done }: IIntervalTimer) {
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [intervalSet, setIntervalSet] = useState(timerObj.focusSet);
  const [minutes, setMinutes] = useState(timerObj.min);
  const [seconds, setSeconds] = useState(timerObj.sec);
  const params = useParams();
  const todoId = params.todoId;

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
    if (intervalSet <= 0) return;
    //done
    if (intervalSet === 1 && count <= 0) {
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
    if (1 <= intervalSet && 0 < count) {
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
    if (1 < intervalSet && count <= 0) {
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

  //초기화
  useEffect(() => {
    setIntervalSet(timerObj.focusSet);
    setMinutes(timerObj.min);
    setSeconds(timerObj.sec);
    if (timerObj.focusSet <= 0) {
      setIsPause(true);
    } else {
      setIsPause(false);
    }
    start();
    return () => {
      setIsPause(false);
      stop();
      reset();
    };
  }, []);

  useEffect(() => {
    timer();
  }, [count]);

  return (
    <>
      {!isPause && (
        <CounterWrapper
          variants={TextUpVarients}
          initial="coundStart"
          animate="end"
        >
          <CounterBox>
            <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <p>:</p>
            <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
          </CounterBox>
        </CounterWrapper>
      )}
      {isPause && !inputToggle && (
        <CounterWrapper>
          <BreakBox
            variants={TextUpVarients}
            initial="coundStart"
            animate="end"
          >
            <h4>{timerObj.focusSet <= 0 ? "FINISH" : "PAUSE"}</h4>
          </BreakBox>
          <BreakBox>
            <h5>다음 휴식까지</h5>
          </BreakBox>
          <BreakBox variants={TextUpVarients} initial="start" animate="end">
            <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
            <p>:</p>
            <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
          </BreakBox>
          <BreakBox>
            <h5>진행된 SET</h5>
          </BreakBox>
          <BreakBox variants={TextUpVarients} initial="start" animate="end">
            <p style={{ marginBottom: 0 }}>
              {timerObj.setFocusSet - timerObj.focusSet}
            </p>
          </BreakBox>
        </CounterWrapper>
      )}
    </>
  );
}

export default React.memo(IntervalTimer);

const CounterWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 58%;
  @media screen and (max-height: 800px) {
    height: 62%;
  }
  @media screen and (max-height: 750px) {
    height: 65%;
  }
`;
const CounterBox = styled(motion.div)`
  margin-top: 3.5vh;
  display: flex;
  justify-content: center;
  p {
    display: flex;
    font-family: "Roboto";
    font-weight: 900;
    font-size: 85px;
    letter-spacing: -3px;
    &:nth-child(2) {
      margin-bottom: 5px;
      font-size: 75px;
      padding-left: 7px;
      padding-right: 5px;
    }
  }
`;
const BreakBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  h5 {
    margin-bottom: 10px;
  }
  h4 {
    font-family: "Roboto";
    font-weight: 900;
    font-size: 70px;
    letter-spacing: -1px;
    margin-bottom: 4.7vh;
    @media screen and (max-height: 650px) {
      font-size: 65px;
      margin-bottom: 20px;
    }
  }
  p {
    display: flex;
    font-family: "Roboto";
    font-weight: 900;
    font-size: 50px;
    letter-spacing: -1px;
    margin-bottom: 3.5vh;
    @media screen and (max-height: 650px) {
      margin-bottom: 15px;
    }
    &:nth-child(2) {
      margin-top: 2px;
      font-size: 35px;
      padding-left: 3px;
      padding-right: 2px;
    }
  }
`;
